import React from "react";
import { Command, Node, mergeAttributes } from "@tiptap/core";
import { CheckSquareOutlined } from "@ant-design/icons";

export default {
  node: Node.create({
    name: "checkList",

    defaultOptions: {
      HTMLAttributes: {},
    },

    group: "block list",

    content: "checkItem+",

    parseHTML() {
      return [
        {
          tag: 'ul[class="checkList"]',
          priority: 51,
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return ["ul", mergeAttributes(HTMLAttributes, { class: "checkList" }), 0];
    },

    addCommands() {
      return {
        toggleTaskList:
          () =>
          ({ commands }) => {
            return commands.toggleList("checkList", "checkItem");
          },
      };
    },

    addKeyboardShortcuts() {
      return {
        "Mod-Shift-9": () => this.editor.commands.toggleTaskList(),
      };
    },
  }),
  slash: {
    title: "checklist",
    element: (
      <span>
        <CheckSquareOutlined /> CheckList
      </span>
    ),
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("checkList", {}).run();
    },
  },
};
