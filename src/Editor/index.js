import { useState, useEffect } from "react";
import createJsonSaveFile from "../hooks/useJsonSaveFile";
import "./Editor.scss";

import EditorToolbar from "../EditorToolbar";

/* tiptap imports */
import { useEditor, EditorContent } from "@tiptap/react";
import { defaultExtensions } from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Link from "@tiptap/extension-link";

/* Extensions */
import ExtensionManager from "./ExtensionManager";
import ActionItem from "./blocks/ActionItem";
import StatBlock from "./blocks/StatBlock";
import DDBImport from "./blocks/DDBImport.js";
import DiceNotation from "./blocks/DiceNotation.js";
import Title from "./blocks/Title.js";

import defaultState from "./defaultState";

const extensions = ExtensionManager([
  Title,
  ...defaultExtensions(),
  Highlight,
  Typography,
  ActionItem,
  StatBlock,
  DDBImport,
  DiceNotation,
]);

const filename = "starter-doc";

const useSaveFile = createJsonSaveFile(filename);

const Editor = () => {
  const [currentContent, setCurrentContent, autoSaving] =
    useSaveFile(defaultState);
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: "c-Editor",
      },
    },
    onUpdate() {
      const json = this.getJSON();
      setCurrentContent(json);
    },
    content: currentContent,
  });

  return (
    <>
      <EditorToolbar
        filename={filename}
        autoSaving={autoSaving}
        editor={editor}
      />
      <EditorContent editor={editor} />
    </>
  );
};

export default Editor;
