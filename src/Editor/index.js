import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { defaultExtensions } from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";

import ActionItem from "./blocks/ActionItem";

import "./style.scss";

import ExtensionManager from "./ExtensionManager";

const extensions = ExtensionManager([
  ...defaultExtensions(),
  Highlight,
  Typography,
  ActionItem
]);

const defaultState = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 1 },
      content: [{ type: "text", text: "Welcome to your Equip Notepad." }]
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "Try adding a block by typing " },
        { type: "text", marks: [{ type: "code" }], text: "/" },
        { type: "text", text: ". You can also use markdown syntax!" }
      ]
    },
    {
      type: "actionItem",
      content: [{ type: "text", text: "Try adding an action item!" }]
    },
    { type: "paragraph" }
  ]
};

const Editor = () => {
  const [currentContent, setCurrentContent] = useState(defaultState);
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: "Editor"
      }
    },
    onUpdate() {
      const json = this.getJSON();
      setCurrentContent(json);
    },
    content: defaultState
  });

  const actionItems = currentContent.content.filter(
    ({ type }) => type === "actionItem"
  );

  return (
    <div className="mainContent">
      <EditorContent editor={editor} />
      <div className="highlights">
        {actionItems.map((actionItem) => {
          const text = actionItem.content ? actionItem.content[0].text : "";
          return <div className="actionItem">{text}</div>;
        })}
      </div>
    </div>
  );
};

export default Editor;
