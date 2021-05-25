import React, { useRef, useEffect } from "react";
import tippy from "tippy.js";
import "tippy.js/themes/material.css";
import ReactDOM from "react-dom";
import "./ContextMenu.scss";

const ContextMenu = ({ location, setCurrentDocument }) => {
  return <div className="c-ContextMenu"></div>;
};

const contextMenu = (location, onHide, setCurrentDocument) => {
  const wrapper = document.createElement("div");
  ReactDOM.render(
    <ContextMenu location={location} setCurrentDocument={setCurrentDocument} />,
    wrapper,
    () => {
      const { height, width } = wrapper.getBoundingClientRect();
      const clientRect = () => ({
        top: location.y,
        left: location.x,
        right: location.x + width,
        bottom: location.y + height,
        height,
        width,
      });
      window.currentContextMenu = tippy("body", {
        getReferenceClientRect: clientRect,
        appendTo: () => document.body,
        content: wrapper,
        showOnCreate: true,
        interactive: true,
        followCursor: "initial",
        trigger: "manual",
        placement: "bottom-start",
        onHide: () => {
          window.currentContextMenu = false;
          onHide();
        },
      });
    }
  );
};

export default contextMenu;
