import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

const Placeholder = Extension.create({
  name: "placeholder",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          decorations: ({ doc, selection }) => {
            const { isEditable, isFocused } = this.editor;
            const { anchor } = selection;
            const decorations: Decoration[] = [];

            if (!isEditable || !isFocused) {
              return DecorationSet.create(doc, []);
            }

            doc.descendants((node, pos) => {
              if (
                node.type.name !== "paragraph" ||
                node.isText ||
                node.text ||
                node.content.content.length > 0
              ) {
                return false;
              }

              const isCurrent =
                anchor >= pos && anchor <= pos + node.nodeSize - 1;

              if (!isCurrent) {
                return false;
              }

              decorations.push(
                Decoration.node(pos, pos + node.nodeSize, {
                  class: "last-focused-placeholder",
                })
              );
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});

export default Placeholder;
