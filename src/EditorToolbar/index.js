import React, { useState, useRef } from "react";
import {
  QuestionOutlined,
  SaveOutlined,
  ExportOutlined,
  ImportOutlined,
  RedoOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import logo from "../logo.svg";
import "./EditorToolbar.scss";
import Modal from "../components/Modal";

const reader = new FileReader();

const EditorToolbar = ({ autoSaving, editor, filename }) => {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [validDoc, setValidDoc] = useState(false);
  const uploadDocInput = useRef(null);
  const importDoc = () => {
    if (uploadDocInput.current?.files && uploadDocInput.current.files[0]) {
      reader.onload = () => {
        try {
          const contents = JSON.parse(reader.result);
          editor.commands.setContent(contents);
          setShowImportModal(false);
        } catch (err) {
          setValidDoc(false);
        }
      };
      reader.readAsText(uploadDocInput.current.files[0]);
    }
  };
  const validateDoc = () => {
    setValidDoc(true);
  };
  const importDocModal = showImportModal && (
    <Modal>
      <div className="c-EditorToolbar-importModal flow">
        <h1>Import a file...</h1>
        <form>
          <input type="file" ref={uploadDocInput} onChange={validateDoc} />
          {validDoc ? "Looks good!" : "Oops, looks like that file is invalid"}
        </form>
        <button disabled={!validDoc} onClick={importDoc}>
          import
        </button>
        <button onClick={() => setShowImportModal(false)}>close</button>
      </div>
    </Modal>
  );
  const aboutModal = showAboutModal && (
    <Modal>
      <div className="c-EditorToolbar-aboutModal flow">
        <img src={logo} alt="Logo" className="logo" />
        <h1>dmpad</h1>
        <p>
          dmpad is a note taking tool for dungeon masters of all kinds. Prepare
          your sessions, design your dungeons, and keep track of your game.
        </p>
        <div>
          <a href="https://wuz.sh">Built by Wuz</a>
        </div>
        <button onClick={() => setShowAboutModal(false)}>close</button>
      </div>
    </Modal>
  );
  const exportDoc = () => {
    const file = new Blob([JSON.stringify(editor.view.state.doc)], {
      type: "text/json",
    });
    const objectUrl = window.URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = `${filename}.json`;
    a.click();
  };
  return (
    <div className="c-EditorToolbar">
      <button onClick={() => setShowAboutModal(true)}>
        <QuestionOutlined />
      </button>
      <button onClick={exportDoc}>
        <ExportOutlined />
      </button>
      <button onClick={() => setShowImportModal(true)}>
        <ImportOutlined />
      </button>
      <button onClick={() => editor.chain().focus().undo().run()}>
        <UndoOutlined />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}>
        <RedoOutlined />
      </button>
      <div className="c-EditorToolbar-autosave flex[ fd-c ai-c jc-c ]">
        <SaveOutlined /> {autoSaving ? "Saving..." : "Saved"}
      </div>
      {aboutModal}
      {importDocModal}
    </div>
  );
};

export default EditorToolbar;
