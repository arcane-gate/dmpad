import { Node, mergeAttributes } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
} from "@tiptap/react";
import React from "react";

const AttributeCell = ({ node }) => {
  const { name } = node.attrs;
  return (
    <NodeViewWrapper as="div" className="c-AttributeBlock-cell">
      <strong contentEditable={false}>{name}</strong>
      <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
};

export default Node.create({
  name: "attributeCell",
  group: "block",
  content: "inline+",
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
