import { Node, mergeAttributes } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
  Range,
  Editor,
} from "@tiptap/react";
import React from "react";
import { FontSizeOutlined } from "@ant-design/icons";

const Title = () => {
  return (
    <NodeViewWrapper>
      <h1 className="title">
        <NodeViewContent className="content" />
      </h1>
    </NodeViewWrapper>
  );
};

const TitleExtension = {
  node: Node.create({
    name: "title",
    group: "block",
    content: "inline*",
    parseHTML() {
      return [
        {
          tag: "title",
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return ["title", mergeAttributes(HTMLAttributes), 0];
    },

    addNodeView() {
      return ReactNodeViewRenderer(Title);
    },
  }),
  slash: {
    title: "title",
    element: (
      <span>
        <FontSizeOutlined /> Title
      </span>
    ),
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).setNode("title", {}).run();
    },
  },
};

export default TitleExtension;
