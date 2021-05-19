import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";

export default Extension.create({
  name: "mention",

  defaultOptions: {
    suggestion: {}
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion
      })
    ];
  }
});
