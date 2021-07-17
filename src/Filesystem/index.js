import React, { useState, useEffect, useContext } from "react";
import { createFilesystem } from "../fjs";
import defaultState, { emptyState } from "../defaultState";
import NewFileModal from "../modals/NewFileModal";
import {
  FileTextOutlined,
  EditOutlined,
  SaveOutlined,
  ReloadOutlined,
  CloseOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import classname from "classnames";

import "./Filesystem.scss";

const defaultFilename = "New dmpad";
const { useFile, useDir } = createFilesystem("dmpad");

export const FilesystemContext = React.createContext({
  currentDocument: defaultState,
  setCurrentDocument: () => {},
  saving: false,
});

const text = (fn) => (e) => fn(e.target.value);

const File = ({
  file,
  updateCurrentFile,
  setCurrentDocumentName,
  currentDocument,
  refresh,
}) => {
  const [editingFilename, setEditingFilename] = useState(false);
  const [newFileName, setNewFileName] = useState(file.fileName);
  if (!currentDocument) return null;
  const updateEditing = () => {
    if (editingFilename) {
      setCurrentDocumentName(newFileName, refresh);
    }
    setEditingFilename(!editingFilename);
  };
  return (
    <li
      className={classname("c-File", {
        active: currentDocument?.fileName === file.fileName,
      })}
      key={file.file}
    >
      {editingFilename && (
        <input onChange={text(setNewFileName)} value={newFileName} />
      )}
      {!editingFilename && (
        <button
          className="c-FileButton"
          onClick={() => updateCurrentFile(file.fileName)}
        >
          <FileTextOutlined />
          {file.fileName}
        </button>
      )}
      <button
        className="c-EditFilenameButton"
        title="Edit File Name"
        onClick={updateEditing}
      >
        {editingFilename && <SaveOutlined />}
        {!editingFilename && <EditOutlined />}
      </button>
    </li>
  );
};

const Filesystem = ({ children, setLoading }) => {
  const [newFileModalShown, setNewFileModalShown] = useState(false);
  const [sidebarShown, setSidebarShown] = useState(false);
  const [currentFileName, setCurrentFileName] = useState(defaultFilename);

  const [currentDocument, setCurrentDocument, setCurrentDocumentName, saving] =
    useFile(currentFileName, defaultState);

  const providerValue = { currentDocument, setCurrentDocument, saving };

  const [currentFiles, getFiles, createFile] = useDir();

  useEffect(() => {
    if (currentDocument) {
      document.title = `${currentDocument.fileName} - dmpad`;
    }
    setLoading(false);
  }, [currentDocument]);

  const updateCurrentFile = (fileName) => {
    setCurrentFileName(fileName);
  };

  const onCreateFile = (fileName) => {
    createFile(fileName, emptyState);
    updateCurrentFile(fileName);
  };

  const refresh = () => {
    getFiles();
  };

  return (
    <FilesystemContext.Provider value={providerValue}>
      {children}
      {!sidebarShown && (
        <button
          onClick={() => setSidebarShown(true)}
          className="c-Filesystem-showButton"
        >
          <ProfileOutlined />
        </button>
      )}
      {sidebarShown && (
        <aside className="c-Filesystem">
          <div className="c-Filesystem-closeButton">
            <button onClick={() => setSidebarShown(false)}>
              <CloseOutlined />
            </button>
          </div>
          <div className="c-FileToolbar">
            <h1>Files</h1>
            <div>
              <button onClick={refresh}>
                <ReloadOutlined />
              </button>
            </div>
          </div>
          <ul>
            {currentFiles
              .sort((fileA, fileB) =>
                fileA.fileName.localeCompare(fileB.fileName)
              )
              .map((file) => (
                <File
                  currentDocument={currentDocument}
                  file={file}
                  setCurrentDocumentName={setCurrentDocumentName}
                  updateCurrentFile={updateCurrentFile}
                  refresh={refresh}
                />
              ))}
          </ul>
          <button onClick={() => setNewFileModalShown(true)}>New File</button>
        </aside>
      )}
      <NewFileModal
        shown={newFileModalShown}
        close={() => setNewFileModalShown(false)}
        createFile={onCreateFile}
      />
    </FilesystemContext.Provider>
  );
};

export default Filesystem;
