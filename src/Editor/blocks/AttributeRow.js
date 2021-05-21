import { Node, mergeAttributes } from "@tiptap/core";

export default Node.create({
  name: "attributeRow",
  group: "block",
  content: "attributeCell",
  parseHTML() {
    return [
      {
        tag: "div[class='c-AttributeBlock-row']",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { class: "c-AttributeBlock-row" }),
      0,
    ];
  },
});
