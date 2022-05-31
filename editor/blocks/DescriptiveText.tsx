import { Node, mergeAttributes } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
  Editor,
  Range,
} from "@tiptap/react";
import React from "react";
import { CompassOutlined } from "@ant-design/icons";

const DescriptiveText = () => {
  return (
    <NodeViewWrapper className="descriptive-text">
      <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
};

const DescriptiveTextExtension = {
  node: Node.create({
    name: "descriptiveText",
    group: "block",
    content: "block*",
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
    command: ({
      editor,
      range,
      props,
    }: {
      editor: Editor;
      range: Range;
      props: Record<string, any>;
    }) => {
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

export default DescriptiveTextExtension;
