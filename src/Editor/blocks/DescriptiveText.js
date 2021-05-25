import { Node, mergeAttributes } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
} from "@tiptap/react";
import React from "react";
import { CompassOutlined } from "@ant-design/icons";

import "./DescriptiveText.scss";

const DescriptiveText = () => {
  return (
    <NodeViewWrapper className="c-DescriptiveText">
      <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
};

export default {
  node: Node.create({
    name: "descriptiveText",
    group: "block",
    content: "block*",
    defaultOptions: {
      HTMLAttributes: {},
    },
    defining: true,
    parseHTML() {
      return [
        {
          tag: "descriptive-text",
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return ["descriptive-text", mergeAttributes(HTMLAttributes), 0];
    },

    addNodeView() {
      return ReactNodeViewRenderer(DescriptiveText);
    },
  }),
  slash: {
    title: "descriptive text",
    element: (
      <span>
        <CompassOutlined /> Descriptive Text
      </span>
    ),
    command: ({ editor, range, props }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContentAt(range, [
          {
            type: "descriptiveText",
            attrs: props,
            content: [{ type: "paragraph" }],
          },
        ])
        .run();
    },
  },
};
