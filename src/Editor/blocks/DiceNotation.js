import {
  Command,
  Mark,
  markPasteRule,
  markInputRule,
  mergeAttributes,
} from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import "./DiceNotation.scss";
import Roll from "roll";

const getRoll = (rollText) => {
  const roll = new Roll();
  const parsedRoll = rollText.replace(/\s/gi, "");
  const { result } = roll.roll(parsedRoll);
  return result;
};

/**
 * A regex that matches any string that contains a dice notation
 */
export const diceRegex =
  /(?:^|\s)(?<dice>((\d+d\d+)(\s?(\+|-)\s?)?(\d+d\d+|\d+)(\s?(\+|-)\s?)?))/gi;

// export const diceInputRegex = /(?:^|\s)((?:\d+d\d+\+?)+)(?:\s)/gim;

/**
 * A regex that matches an dice notation
 */
export const diceRegexExact =
  /^(((\d+d\d+)(\s?(\+|-)\s?)?(\d+d\d+|\d+)(\s?(\+|-)\s?)?))$/gim;

export const DiceNotation = Mark.create({
  name: "dice-notation",

  priority: 1000,

  inclusive: false,

  defaultOptions: {
    rollOnClick: true,
    createOnPaste: true,
    createOnType: true,
  },

  parseHTML() {
    return [{ tag: "span.dice-notation" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span.dice-notation",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addPasteRules() {
    return [markPasteRule(diceRegex, this.type)];
  },

  addProseMirrorPlugins() {
    const plugins = [];
    const findDiceNotations = (doc) => {
      const result = [];
      doc.descendants((node, pos) => {
        if (node.isText && node.text) {
          for (const match of node.text.matchAll(diceRegex)) {
            if (match.groups?.dice && isNaN(Number(match.groups.dice))) {
              const diceIndex =
                (match?.index || 0) + match[0].indexOf(match.groups.dice);
              const diceLen = match.groups.dice.length;
              result.push({
                from: pos + diceIndex,
                to: pos + diceIndex + diceLen,
              });
            }
          }
        }
      });
      return result;
    };

    const diceDecorations = (doc) => {
      const decorations = [];
      findDiceNotations(doc).forEach((dice) => {
        decorations.push(
          Decoration.inline(dice.from, dice.to, {
            class: "dice-notation",
          })
        );
      });
      return DecorationSet.create(doc, decorations);
    };

    const dicePlugin = new Plugin({
      state: {
        init(_, { doc }) {
          return diceDecorations(doc);
        },
        apply(tr, old) {
          return tr.docChanged ? diceDecorations(tr.doc) : old;
        },
      },
      props: {
        decorations(state) {
          return this.getState(state);
        },
      },
    });
    plugins.push(dicePlugin);

    if (this.options.rollOnClick) {
      plugins.push(
        new Plugin({
          key: new PluginKey("handleClickDiceNotation"),
          props: {
            handleClick: (view, pos, event) => {
              event.preventDefault();
              event.stopPropagation();
              const rollText = event.target?.textContent.trim();
              const attrs = this.editor.getAttributes("dice-notation");
              const closest = event.target?.closest(".dice-notation");
              if (!rollText || !closest) return false;
              const result = getRoll(rollText);

              if (event.metaKey || event.ctrlKey) {
                // closest.replaceContent(result);
                alert(rollText + " = " + result);
              } else {
                alert(rollText + " = " + result);
              }
              return false;
            },
          },
        })
      );
    }

    if (this.options.createOnPaste) {
      plugins.push(
        new Plugin({
          key: new PluginKey("handlePasteDiceNotation"),
          props: {
            handlePaste: (view, event, slice) => {
              const { state } = view;
              const { selection } = state;
              const { empty } = selection;

              if (empty) {
                return false;
              }

              let textContent = "";

              slice.content.forEach((node) => {
                textContent += node.textContent;
              });

              if (!textContent || !textContent.match(diceRegexExact)) {
                return false;
              }

              this.editor.commands.setMark(this.type);

              return true;
            },
          },
        })
      );
    }

    return plugins;
  },
});

export default DiceNotation;
