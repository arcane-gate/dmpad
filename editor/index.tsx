import { useContext, useEffect } from "react";

import { isEqual } from "lodash";

import Menu from "./Menu";
import StyledEditor from "./StyledEditor";

/* tiptap imports */
import { useEditor, EditorContent, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

/* Extensions */
import ExtensionManager from "./ExtensionManager";
import ActionItem from "./blocks/ActionItem";
import DescriptiveText from "./blocks/DescriptiveText";
import StatBlock from "./blocks/StatBlock";
import AttributeBlock from "./blocks/AttributeBlock";
import DDBImport from "./blocks/DDBImport";
import DiceNotation from "./blocks/DiceNotation";
import Title from "./blocks/Title";
import CheckList from "./blocks/CheckList";
import CheckItem from "./blocks/CheckItem";
import Placeholder from "./blocks/Placeholder";
// Stickers aren't quite working
// import Sticker from "./blocks/Sticker";
import Emote, { EmojiNode } from "./blocks/Emote";

const extensions: Extension[] = ExtensionManager(
  StarterKit,
  Title,
  Highlight,
  Typography,
  Link,
  ActionItem,
  StatBlock,
  // // DDBImport,
  DiceNotation,
  Emote,
  EmojiNode,
  CheckList,
  CheckItem,
  AttributeBlock,
  Placeholder,
  DescriptiveText
);

const Editor = ({ pad, updatePad }) => {
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: "editor",
      },
    },
    onUpdate() {
      const json = this.getJSON();
      updatePad(json);
    },
    content: pad.doc,
  });

  useEffect(() => {
    if (editor) {
      const json = editor.getJSON();
      if (!isEqual(json, pad.doc)) {
        editor.commands.setContent(pad.doc);
      }
    }
  }, [pad, editor]);

  return (
    <StyledEditor>
      <Menu editor={editor} />
      <EditorContent editor={editor} />
    </StyledEditor>
  );
};

export default Editor;
