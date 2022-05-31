import { Node, mergeAttributes } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
} from "@tiptap/react";
import React from "react";

type NodeType = {
  attrs: {
    name: string;
  };
};

const AttributeCell = ({ node }: { node: NodeType }) => {
  const { name } = node.attrs;
  return (
    <NodeViewWrapper as="div" className="attribute-block-cell">
      <strong contentEditable={false}>{name}</strong>
      <NodeViewContent className="content" as="span" />
    </NodeViewWrapper>
  );
};

export default Node.create({
  name: "attributeCell",
  group: "block",
  content: "text*",
  isolating: true,
  addAttributes() {
    return {
      name: {
        default: "",
        parseHTML: (element) => ({
          name: element.getAttribute("data-name"),
        }),
        renderHTML: (attributes) => ({
          "data-name": attributes.name,
        }),
        keepOnSplit: false,
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "td",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["td", mergeAttributes(HTMLAttributes), 0];
  },
  addNodeView() {
    return ReactNodeViewRenderer(AttributeCell);
  },
});
