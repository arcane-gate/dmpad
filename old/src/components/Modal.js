import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { uniqueId } from "lodash";

const modalRoot = document.getElementById("modal-root");

const Modal = ({ children, shown = true }) => {
  const element = document.createElement("div");
  const id = uniqueId("modal");
  element.classList.add("modal", `${id}`);
  useEffect(() => {
    if (shown) {
      modalRoot.appendChild(element);
    }
    if (!shown && modalRoot.querySelector(`.${id}`) !== null) {
      modalRoot.removeChild(element);
    }
    return () => {
      if (modalRoot.querySelector(`.${id}`) !== null) {
        modalRoot.removeChild(element);
      }
    };
  }, [shown]);
  if (!shown) return null;
  return ReactDOM.createPortal(children, element);
};

export default Modal;
