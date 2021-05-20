import { Node, mergeAttributes } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
} from "@tiptap/react";
import React, { useLayoutEffect, useRef, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";

import "./Sticker.scss";

const Sticker = ({ editor }) => {
  console.log(editor);
  const element = useRef(null);
  const dragging = useRef(false);
  const [coords, setCoords] = useState({
    top: 0,
    left: 0,
    offsetX: 0,
    offsetY: 0,
  });
  const drag = (event) => {
    if (!element.current || !dragging.current) return;
    const { left, top, offsetX, offsetY } = coords;
    element.current.style.left = `${left + event.clientX - offsetX}px`;
    element.current.style.top = `${top + event.clientY - offsetY}px`;
    return false;
  };
  const startDrag = (event) => {
    if (!event.target.draggable || event.target !== element.current) return;
    event.stopPropagation();
    event.preventDefault();
    dragging.current = true;
    const style = window.getComputedStyle(element.current);
    const left =
      Number(style.getPropertyValue("left").replace("px", "")) - event.clientX;
    const top =
      Number(style.getPropertyValue("top").replace("px", "")) - event.clientY;
    const offsetX = event.clientX;
    const offsetY = event.clientY;
    setCoords({ left, top, offsetX, offsetY });
    editor.view.dom.addEventListener("mousemove", drag);
    return false;
  };
  const stopDrag = () => {
    dragging.current = false;
    editor.view.dom.removeEventListener("mousemove", drag);
  };
  useLayoutEffect(() => {
    if (element.current) {
      const { top, left } = element.current.getBoundingClientRect();
      element.current.style.top = `${top}px`;
      element.current.style.left = `${left}px`;
      setCoords({ top, left });
    }
    editor.view.dom.addEventListener("mouseup", stopDrag);
    editor.view.dom.addEventListener("mousedown", startDrag);
    return () => {
      editor.view.dom.removeEventListener("mouseup", stopDrag);
      editor.view.dom.removeEventListener("mousedown", startDrag);
    };
  }, [element]);
  return (
    <NodeViewWrapper contentEditable="false">
      <img
        className="c-Sticker"
        ref={element}
        src="https://wardragons.com/img/slides/dragon-info/fenrir.png"
        contenteditable="false"
      />
    </NodeViewWrapper>
  );
};

export default {
  node: Node.create({
    name: "sticker",
    group: "inline",
    atom: true,
    inline: true,
    selectable: false,
    draggable: false,
    parseHTML() {
      return [
        {
          tag: "sticker",
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return ["sticker", mergeAttributes(HTMLAttributes), 0];
    },

    addNodeView() {
      return ReactNodeViewRenderer(Sticker);
    },
  }),
  slash: {
    title: "sticker",
    element: (
      <span>
        <SmileOutlined /> Sticker
      </span>
    ),
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent({ type: "sticker" })
        .run();
    },
  },
};
