import { Node, mergeAttributes } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
} from "@tiptap/react";
import React from "react";
import { BulbOutlined } from "@ant-design/icons";
import styled from "styled-components";

const ActionItemWrapper = styled(NodeViewWrapper)`
  display: flex;
  align-items: stretch;
  padding: 0;
  min-height: 52px;
  border: 2px solid var(--black);
  margin: 2em 0;

  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff642;
    font-size: 24px;
    padding: 8px 1em;
    color: var(--c-black);
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 1em;
    border-left: none;
  }
`;

const ActionItem = () => {
  return (
    <ActionItemWrapper>
      <span className="label" contentEditable={false}>
        <BulbOutlined />
      </span>

      <NodeViewContent className="content" />
    </ActionItemWrapper>
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
      return ReactNodeViewRenderer(ActionItem);
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
