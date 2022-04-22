import { Node, mergeAttributes } from "@tiptap/core";

export default Node.create({
  name: "attributeRow",
  group: "block",
  content: "attributeCell*",
  parseHTML() {
    return [
      {
        tag: "div[class='attribute-block-row']",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { class: "attribute-block-row" }),
      0,
    ];
  },
});
