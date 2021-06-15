import { useState, useEffect } from 'react';
import './Editor.scss';
import { isEqual } from 'lodash';

import Menu from './Menu';

/* tiptap imports */
import { useEditor, EditorContent } from '@tiptap/react';
import { defaultExtensions } from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

/* Extensions */
import ExtensionManager from './ExtensionManager';
import ActionItem from './blocks/ActionItem';
import DescriptiveText from './blocks/DescriptiveText';
import StatBlock from './blocks/StatBlock';
import AttributeBlock from './blocks/AttributeBlock';
import DDBImport from './blocks/DDBImport.js';
import DiceNotation from './blocks/DiceNotation.js';
import Title from './blocks/Title.js';
import CheckList from './blocks/CheckList.js';
import CheckItem from './blocks/CheckItem.js';
import Placeholder from './blocks/Placeholder.js';
// Stickers aren't quite working
// import Sticker from "./blocks/Sticker.js";
import Emote, { EmojiNode } from './blocks/Emote.js';

const extensions = ExtensionManager(
  ...defaultExtensions(),
  Title,
  Highlight,
  Typography,
  Link,
  ActionItem,
  StatBlock,
  // DDBImport,
  DiceNotation,
  Emote,
  EmojiNode,
  CheckList,
  CheckItem,
  AttributeBlock,
  Placeholder,
  DescriptiveText
);

const Editor = ({
  filename,
  currentDocument,
  setCurrentDocument,
  autoSaving,
}) => {
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: 'c-Editor',
      },
    },
    onUpdate() {
      const json = this.getJSON();
      setCurrentDocument((state) => ({ ...state, content: json }));
    },
    content: currentDocument.content,
  });

  useEffect(() => {
    if (editor) {
      const json = editor.getJSON();
      if (!isEqual(json, currentDocument.content)) {
        console.log(json);
        editor.commands.setContent(currentDocument.content);
      }
    }
  }, [currentDocument]);

  return (
    <>
      <Menu editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Editor;
