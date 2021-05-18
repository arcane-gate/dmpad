import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { defaultExtensions } from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';

import ActionItem from './blocks/ActionItem';
import StatBlock from './blocks/StatBlock';
import DDBImport from './blocks/DDBImport.js';
import DiceNotation from './blocks/DiceNotation.js';

import './style.scss';

import ExtensionManager from './ExtensionManager';
import createPersistedState from 'use-persisted-state';

const useStarterDocState = createPersistedState('starter-doc');

const extensions = ExtensionManager([
  ...defaultExtensions(),
  Highlight,
  Typography,
  ActionItem,
  StatBlock,
  DDBImport,
  DiceNotation,
]);

const defaultState = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [{ type: 'text', text: 'Welcome to DMpad' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Try adding a block by typing ' },
        { type: 'text', marks: [{ type: 'code' }], text: '/' },
        { type: 'text', text: '. You can also use markdown syntax!' },
      ],
    },
    {
      type: 'actionItem',
      content: [
        { type: 'text', text: 'Try adding an action item with /action' },
      ],
    },
    {
      type: 'statBlock',
      content: [
        {
          type: 'heading',
          attrs: { level: 3 },
          content: [{ type: 'text', text: 'Stat Block' }],
        },
        { type: 'paragraph' },
      ],
    },
  ],
};

const Editor = () => {
  const [currentContent, setCurrentContent] = useStarterDocState(defaultState);
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: 'Editor',
      },
    },
    onUpdate() {
      const json = this.getJSON();
      setCurrentContent(json);
    },
    content: currentContent,
  });

  return <EditorContent editor={editor} />;
};

export default Editor;
