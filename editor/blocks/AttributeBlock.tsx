import { Node, mergeAttributes } from "@tiptap/core";
import React from "react";
import { FontSizeOutlined } from "@ant-design/icons";
import AttributeRow from "./AttributeRow";
import AttributeCell from "./AttributeCell";

const AttributeBlock = {
  requires: [AttributeRow, AttributeCell],
  node: () =>
    Node.create({
      name: "attributeBlock",
      group: "block",
      content: "attributeRow+",
      isolating: true,
      // atom: true,
      parseHTML() {
        return [
          {
            tag: 'div[class="attribute-block"]',
            priority: 51,
          },
        ];
      },

      renderHTML({ HTMLAttributes }) {
        return [
          "div",
          mergeAttributes(HTMLAttributes, { class: "attribute-block" }),
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

export default AttributeBlock;
