import React, { useState } from "react";
import { Node, mergeAttributes } from "@tiptap/core";
import { wrappingInputRule } from "prosemirror-inputrules";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
} from "@tiptap/react";
import { FontSizeOutlined } from "@ant-design/icons";

import "./CheckItem.scss";

const CheckItem = ({ node, updateAttributes }) => {
  const [checked, setChecked] = useState(node.attrs.checked);
  const onClick = () => {
    setChecked(!checked);
    updateAttributes({ checked: !checked });
    //     Object
    //       .entries(HTMLAttributes)
    //       .forEach(([key, value]) => {
    //         listItem.setAttribute(key, value)
    //       })
    //         editor
    //           .chain()
    //           .focus()
    //           .command(({ tr }) => {
    //             tr.setNodeMarkup(getPos(), undefined, {
    //               checked,
    //             })

    //             return true
    //           })
    //           .run()
  };
  return (
    <NodeViewWrapper as="li">
      <label contentEditable={false}>
        <input type="checkbox" checked={checked} onChange={onClick} />
      </label>
      <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
};

export const inputRegex = /^\s*(\[([ |x])\])\s$/;

export default {
  node: Node.create({
    name: "checkItem",

    defaultOptions: {
      nested: true,
      HTMLAttributes: {},
    },

    content() {
      return this.options.nested ? "paragraph block*" : "paragraph+";
    },

    defining: true,

    addAttributes() {
      return {
        checked: {
          default: false,
          parseHTML: (element) => ({
            checked: element.getAttribute("data-checked") === "true",
          }),
          renderHTML: (attributes) => ({
            "data-checked": attributes.checked,
          }),
          keepOnSplit: false,
        },
      };
    },

    parseHTML() {
      return [
        {
          tag: 'li[data-type="checkItem"]',
          priority: 51,
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return [
        "li",
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          "data-type": "checkItem",
        }),
        0,
      ];
    },

    addKeyboardShortcuts() {
      const shortcuts = {
        Enter: () => this.editor.commands.splitListItem("checkItem"),
        "Shift-Tab": () => this.editor.commands.liftListItem("checkItem"),
      };

      if (!this.options.nested) {
        return shortcuts;
      }

      return {
        ...shortcuts,
        Tab: () => this.editor.commands.sinkListItem("checkItem"),
      };
    },

    addNodeView() {
      return ReactNodeViewRenderer(CheckItem);
    },

    addInputRules() {
      return [
        wrappingInputRule(inputRegex, this.type, (match) => ({
          checked: match[match.length - 1] === "x",
        })),
      ];
    },
  }),
};
