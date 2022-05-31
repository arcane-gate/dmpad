import React from "react";
import { Node, mergeAttributes } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
  Editor,
  Range,
} from "@tiptap/react";

// import Icon from "../../components/Icon";

const StatBlock = () => {
  return (
    <NodeViewWrapper className="stat-block">
      <span className="label" contentEditable={false}>
        {/* <Icon name="SwordWound" /> */}
      </span>
      <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
};

const StatBlockExtension = {
  node: Node.create({
    name: "statBlock",
    group: "block",
    content: "block*",
    defining: true,
    parseHTML() {
      return [
        {
          tag: "stat-block",
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return [
        "stat-block",
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        0,
      ];
    },

    addNodeView() {
      return ReactNodeViewRenderer(StatBlock);
    },
  }),
  slash: {
    title: "stat block",
    element: (
      <span>
        {/* <Icon name="SwordWound" />  */}
        Stat Block
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
        .insertContentAt(range, [
          {
            type: "statBlock",
            attrs: props,
            content: [{ type: "paragraph" }],
          },
        ])
        .run();
    },
    allow: ({ editor, range }: { editor: Editor; range: Range }) => {
      return editor.can().insertContentAt(range, { type: "statBlock" });
    },
  },
};

export default StatBlockExtension;
