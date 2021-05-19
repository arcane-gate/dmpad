import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root");

const Modal = ({ children }) => {
  const element = document.createElement("div");
  element.classList.add("modal");
  useEffect(() => {
    modalRoot.appendChild(element);
    return () => {
      modalRoot.removeChild(element);
    };
  });
  return ReactDOM.createPortal(children, element);
};

export default Modal;
