import React from "react";
import ReactDOM from "react-dom";
import Icon from "../../components/Icon";

export default {
  slash: {
    title: "import from ddb",
    element: (
      <span>
        <Icon name="DragonHead" /> Import from DDB
      </span>
    ),
    command: (props) => {
      props.editor.chain().focus();
      window.editor = props.editor;
      const event = new CustomEvent("ddbImport", { detail: props });
      document.dispatchEvent(event);
    },
    allow: ({ editor, range }) => {
      return editor.can().insertContentAt(range, { type: "statBlock" });
    },
  },
};
