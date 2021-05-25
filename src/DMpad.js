import React from "react";
import "./styles/styles.scss";

import Editor from "./Editor";
import EditorToolbar from "./EditorToolbar";
import ImportModal from "./ImportModal";
import Accounts from "./Accounts";
import { useEffect, useState } from "react";
import ActionBar from "./ActionBar";
import contextMenu from "./ContextMenu";
import defaultState from "./defaultState";
import createJsonSaveFile from "./hooks/useJsonSaveFile";
import Sticker from "./VisualLayer/Sticker";

const filename = "starter-doc";
const useSaveFile = createJsonSaveFile(filename);

const DMpad = () => {
  const [currentDocument, setCurrentDocument, autoSaving] =
    useSaveFile(defaultState);
  const [actionBarOpen, setActionBarOpen] = useState(false);
  const [accountsShow, setAccountsShow] = useState(false);
  const updateSticker = (id) => (sticker) => {
    const { visualLayerContent = [] } = currentDocument;
    const newVisualLayerContent = [...visualLayerContent];
    const stickerIndex = visualLayerContent.findIndex(
      (sticker) => sticker.id === id
    );
    newVisualLayerContent[stickerIndex] = sticker;
    setCurrentDocument({
      ...currentDocument,
      visualLayerContent: newVisualLayerContent,
    });
  };
  const handleKeys = (event) => {
    if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
      event.stopPropagation();
      event.preventDefault();
      setActionBarOpen(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeys);
    return () => {
      document.removeEventListener("keydown", handleKeys);
    };
  });
  return (
    <div className="DMpad AppFrame">
      <EditorToolbar
        filename={filename}
        autoSaving={autoSaving}
        currentDocument={currentDocument}
        setCurrentDocument={setCurrentDocument}
        setShowAccounts={setAccountsShow}
      />
      <Editor
        currentDocument={currentDocument}
        setCurrentDocument={setCurrentDocument}
        autoSaving={autoSaving}
        filename={filename}
      />
      {/* <div className="c-VisualLayer">
        {currentDocument.visualLayerContent.map((elem) => {
          if (elem.type === "sticker") {
            return (
              <Sticker
                key={elem.id}
                sticker={elem}
                updateSticker={updateSticker(elem.id)}
              />
            );
          }
        })}
      </div> */}
      <ImportModal />
      <Accounts show={accountsShow} />
      {actionBarOpen && <ActionBar />}
    </div>
  );
};

export default DMpad;
