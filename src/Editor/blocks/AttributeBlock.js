import { Node, mergeAttributes } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
} from "@tiptap/react";
import React from "react";
import { FontSizeOutlined } from "@ant-design/icons";
import AttributeRow from "./AttributeRow";
import AttributeCell from "./AttributeCell";

import "./AttributeBlock.scss";

export default {
  requires: [AttributeRow, AttributeCell],
  node: () =>
    Node.create({
      name: "attributeBlock",
      group: "block",
      content: "attributeRow*",
      atom: true,
      parseHTML() {
        return [
          {
            tag: 'div[class="c-AttributeBlock"]',
            priority: 51,
          },
        ];
      },

      renderHTML({ HTMLAttributes }) {
        return [
          "div",
          mergeAttributes(HTMLAttributes, { class: "c-AttributeBlock" }),
          0,
        ];
      },
    }),
  slash: {
    title: "attribute block",
    element: (
      <span>
        <FontSizeOutlined /> Attributes
      </span>
    ),
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent({
          type: "attributeBlock",
          content: [
            {
              type: "attributeRow",
              content: [
                {
                  type: "attributeCell",
                  attrs: { name: "STR" },
                },
                {
                  type: "attributeCell",
                  attrs: { name: "DEX" },
                },
                {
                  type: "attributeCell",
                  attrs: { name: "CON" },
                },
                {
                  type: "attributeCell",
                  attrs: { name: "INT" },
                },
                {
                  type: "attributeCell",
                  attrs: { name: "WIS" },
                },
                {
                  type: "attributeCell",
                  attrs: { name: "CHA" },
                },
              ],
            },
          ],
        })
        .run();
    },
  },
};
