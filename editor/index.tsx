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
import Placeholder from "@tiptap/extension-placeholder";

/* Extensions */
import ExtensionManager from "./ExtensionManager";
import ActionItem from "./blocks/ActionItem";
import DescriptiveText from "./blocks/DescriptiveText";
import StatBlock from "./blocks/StatBlock";
import AttributeBlock from "./blocks/AttributeBlock";
// import DDBImport from "./blocks/DDBImport";
import DiceNotation from "./blocks/DiceNotation";
import Title from "./blocks/Title";
// Stickers aren't quite working
// import Sticker from "./blocks/Sticker";
import Emote, { EmojiNode } from "./blocks/Emote";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Pad } from "../types/pad";

const extensions: Extension[] = ExtensionManager(
  StarterKit,
  Placeholder.configure({
    placeholder: "Type / for more",
  }),
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
  TaskList.configure({
    HTMLAttributes: {
      class: "check-list",
    },
  }),
  TaskItem.configure({
    nested: true,
  }),
  AttributeBlock,
  DescriptiveText
);

type EditorProps = {
  pad: Pad;
  updatePad: (pad: Pad) => void;
};

const Editor = ({ pad, updatePad }: EditorProps) => {
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

  if (!editor) return null;

  return (
    <StyledEditor>
      <Menu editor={editor} />
      <EditorContent editor={editor} />
    </StyledEditor>
  );
};

export default Editor;
