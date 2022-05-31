import React from "react";
import {
  FontSizeOutlined,
  BoldOutlined,
  ItalicOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Range, Editor } from "@tiptap/react";

const baseSlashCommands = [
  {
    title: "header 1",
    element: (
      <span>
        <FontSizeOutlined /> Header 1
      </span>
    ),
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    title: "header 2",
    element: (
      <span>
        <FontSizeOutlined /> Header 2
      </span>
    ),
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    title: "bold",
    element: (
      <span>
        <BoldOutlined /> Bold
      </span>
    ),
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).setMark("bold").run();
    },
  },
  {
    title: "italic",
    element: (
      <span>
        <ItalicOutlined /> Italic
      </span>
    ),
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).setMark("italic").run();
    },
  },
  {
    title: "checklist",
    element: (
      <span>
        <CheckOutlined /> Task List
      </span>
    ),
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.commands.toggleTaskList();
    },
  },
];

export default baseSlashCommands;
