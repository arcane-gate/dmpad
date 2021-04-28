import { Node, mergeAttributes } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent
} from "@tiptap/react";
import React from "react";
import { Lightbulb } from "phosphor-react";

import "./ActionItem.scss";

const Actionitem = () => {
  return (
    <NodeViewWrapper className="action-item">
      <span className="label" contentEditable={false}>
        <Lightbulb /> Action Item
      </span>

      <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
};

export default {
  node: Node.create({
    name: "actionItem",
    group: "block",
    content: "inline*",
    parseHTML() {
      return [
        {
          tag: "action-item"
        }
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return ["action-item", mergeAttributes(HTMLAttributes), 0];
    },
  
    addNodeView() {
      return ReactNodeViewRenderer(Actionitem);
    }
  }),
  slash: {
    title: "action item",
    element: (
      <span>
        <Lightbulb /> Action Item
      </span>
    ),
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("actionItem", {}).run();
    }
  }
}
