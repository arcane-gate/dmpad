import React from 'react';
import './styles/styles.scss';

import Editor from './Editor';
import EditorToolbar from './EditorToolbar';
import ImportModal from './ImportModal';
import Accounts from './Accounts';
import { useEffect, useState } from 'react';
import ActionBar from './ActionBar';
import contextMenu from './ContextMenu';
import defaultState from './defaultState';
import createJsonSaveFile from './hooks/useJsonSaveFile';
import Sticker from './VisualLayer/Sticker';
import createPersistedState from 'use-persisted-state';
import Modal from './components/Modal';


const defaultFilename = 'starter-doc';
const useFileList = createPersistedState('filelist');

const NewFileModal = ({ shown, close, createFile }) => {
  const [newFileName, setNewFileName] = useState('');
  const changeName = (e) => {
    e.preventDefault();
    setNewFileName(e.target.value);
  };
  return (
    shown && (
      <Modal>
        <div className="flow">
          <label>
            New File Name:
            <input
              type="text"
              autoFocus={true}
              value={newFileName}
              onChange={changeName}
            />
          </label>
          <div className="flex[ ai-c jc-sb ]">
          <button onClick={createFile}>Create</button>
          <button onClick={close}>Close</button>
          </div>
        </div>
      </Modal>
    )
  );
};

const DMpad = () => {
  const [filename, setFilename] = useState(defaultFilename);
  const useSaveFile = createJsonSaveFile(filename);
  const [fileList, setFileList] = useFileList({ files: [defaultFilename] });
  const [currentDocument, setCurrentDocument, autoSaving, loading] =
    useSaveFile(defaultState);
  const [actionBarOpen, setActionBarOpen] = useState(false);
  const [accountsShow, setAccountsShow] = useState(false);
  const [newFileModalShown, setNewFileModalShown] = useState(false);
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
    if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
      event.stopPropagation();
      event.preventDefault();
      setActionBarOpen(true);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeys);
    return () => {
      document.removeEventListener('keydown', handleKeys);
    };
  });
  const actions = {
    newFile: () => {
      setActionBarOpen(false);
      setNewFileModalShown(true);
    },
    setFilename,
    setFileList,
  };
  if(loading) { return <div>LOADING</div> }
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
      <NewFileModal
        shown={newFileModalShown}
        close={() => setNewFileModalShown(false)}
      />
      <Accounts show={accountsShow} hideModal={() => setAccountsShow(false)} />
      {actionBarOpen && (
        <ActionBar
          document={currentDocument}
          fileList={fileList}
          actions={actions}
          filename={filename}
        />
      )}
    </div>
  );
};

export default DMpad;
