import React from "react";
import {
  NumberSquareOne,
  NumberSquareTwo,
  TextBolder,
  TextItalic
} from "phosphor-react";

const baseSlashCommands = [
  {
    title: "header 1",
    element: (
      <span>
        <NumberSquareOne /> Header 1
      </span>
    ),
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    }
  },
  {
    title: "header 2",
    element: (
      <span>
        <NumberSquareTwo /> Header 1
      </span>
    ),
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    }
  },
  {
    title: "bold",
    element: (
      <span>
        <TextBolder /> Bold
      </span>
    ),
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setMark("bold").run();
    }
  },
  {
    title: "italic",
    element: (
      <span>
        <TextItalic /> Italic
      </span>
    ),
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setMark("italic").run();
    }
  }
];

export default baseSlashCommands;
