import { Node, mergeAttributes } from "@tiptap/core";
import React, { useEffect, useRef, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { useDebouncedCallback } from "use-debounce";
import "./Sticker.scss";

const referenceSize = () => {
  return parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--reference-size"
    ),
    10
  );
};

// const getPageViewOffset = () => {
//   return {
//     xOffset: (window.innerWidth - referenceSize()) / 2,
//     yOffset: Math.min((window.innerWidth - referenceSize()) / 2, 0),
//   };
// };

const absoluteToRelativeXY = (e) => {
  const refSize = referenceSize();
  return {
    x: e.x / refSize,
    y: e.y / refSize,
  };
};

const relativeToAbsoluteXY = (e) => {
  const refSize = referenceSize();
  return {
    x: e.x * refSize,
    y: e.y * refSize,
  };
};

const relativeOffsetXY = (e, currentWidth) => {
  const { innerWidth } = window;
  const refSize = referenceSize();
  const windowSizeChange = innerWidth / currentWidth;
  return {
    x: e.x * windowSizeChange,
    y: e.y,
  };
};

const Sticker = ({ sticker, updateSticker }) => {
  const { position, src } = sticker;
  const element = useRef(null);
  const dragging = useRef(false);
  const [coords, setCoords] = useState({
    windowWidth: window.innerWidth,
    ...position,
  });
  const debounceUpdateSticker = useDebouncedCallback(updateSticker, 300);
  const drag = (event) => {
    if (!element.current || !dragging.current) return;
    const { x: left, y: top } = absoluteToRelativeXY(event);
    setCoords((state) => ({
      ...state,
      top,
      left,
    }));
    return false;
  };
  const startDrag = (event) => {
    if (!event.target.draggable || event.target !== element.current) return;
    event.stopPropagation();
    event.preventDefault();
    dragging.current = true;
    document.body.addEventListener("mousemove", drag);
    return false;
  };
  const stopDrag = (event) => {
    if (!dragging.current) return;
    dragging.current = false;
    const { clientX: x, clientY: y } = event;
    const { x: left, y: top } = absoluteToRelativeXY({ x, y });
    updateSticker({
      ...sticker,
      position: {
        ...sticker.position,
        left,
        top,
      },
    });
    document.body.removeEventListener("mousemove", drag);
  };
  const updateWindowSize = () => {
    const { left, top, windowWidth } = coords;
    const { x } = relativeOffsetXY(
      {
        x: coords.left,
        y: coords.top,
      },
      windowWidth
    );
    setCoords({
      ...coords,
      left: x,
      windowWidth: window.innerWidth,
    });
    debounceUpdateSticker({
      ...sticker,
      position: {
        ...sticker.position,
        left,
        top,
      },
    });
  };
  useEffect(() => {
    window.addEventListener("resize", updateWindowSize);
    document.body.addEventListener("mouseup", stopDrag);
    document.body.addEventListener("mousedown", startDrag);
    return () => {
      window.removeEventListener("resize", updateWindowSize);
      document.body.removeEventListener("mouseup", stopDrag);
      document.body.removeEventListener("mousedown", startDrag);
    };
  }, []);
  const style = {
    top: `${coords.top}rem`,
    left: `${coords.left}rem`,
    width: `${coords.width}px`,
  };
  return (
    <img
      className={classNames("c-Sticker", { active: Boolean(dragging.current) })}
      style={style}
      ref={element}
      src={src}
    />
  );
};

export default Sticker;
