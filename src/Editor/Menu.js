import React from "react";
import { BubbleMenu } from "@tiptap/react";
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  CodeOutlined,
  BlockOutlined,
  ClearOutlined,
} from "@ant-design/icons";

import "./Menu.scss";

const Menu = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu className="c-BubbleMenu" editor={editor}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <BoldOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <ItalicOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <StrikethroughOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <CodeOutlined />
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        <ClearOutlined />
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        <BlockOutlined />
      </button>
    </BubbleMenu>
  );
};

export default Menu;

// <button
//   onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//   className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
// >
//   h1
// </button>
// <button
//   onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
//   className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
// >
//   h5
// </button>
// <button
//   onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
//   className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
// >
//   h6
// </button>
// <button
//   onClick={() => editor.chain().focus().toggleBulletList().run()}
//   className={editor.isActive("bulletList") ? "is-active" : ""}
// >
//   bullet list
// </button>
// <button
//   onClick={() => editor.chain().focus().toggleOrderedList().run()}
//   className={editor.isActive("orderedList") ? "is-active" : ""}
// >
//   ordered list
// </button>
// <button
//   onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//   className={editor.isActive("codeBlock") ? "is-active" : ""}
// >
//   code block
// </button>
// <button
//   onClick={() => editor.chain().focus().toggleBlockquote().run()}
//   className={editor.isActive("blockquote") ? "is-active" : ""}
// >
//   blockquote
// </button>
// <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
//   horizontal rule
// </button>
// <button onClick={() => editor.chain().focus().setHardBreak().run()}>
//   hard break
// </button>
