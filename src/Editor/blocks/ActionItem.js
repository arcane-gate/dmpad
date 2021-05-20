import { Node, mergeAttributes } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
} from "@tiptap/react";
import React from "react";
import { BulbOutlined } from "@ant-design/icons";

import "./ActionItem.scss";

const Actionitem = () => {
  return (
    <NodeViewWrapper className="c-ActionItem">
      <span className="label" contentEditable={false}>
        <BulbOutlined />
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
          tag: "action-item",
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return ["action-item", mergeAttributes(HTMLAttributes), 0];
    },

    addNodeView() {
      return ReactNodeViewRenderer(Actionitem);
    },
  }),
  slash: {
    title: "action item",
    element: (
      <span>
        <BulbOutlined /> Action Item
      </span>
    ),
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("actionItem", {}).run();
    },
  },
};
