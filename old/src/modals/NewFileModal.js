import React, { useState } from "react";
import Modal from "../components/Modal";

const text = (fn) => (e) => fn(e.target.value);

const NewFileForm = ({ createFile, close }) => {
  const [newFileName, setNewFileName] = useState("");
  const [error, setError] = useState(null);
  const onCreateFile = (e) => {
    e.preventDefault();
    try {
      createFile(newFileName);
      close();
    } catch (err) {
      setError(err);
    }
  };
  return (
    <form className="flow">
      <label>
        New File Name:
        <input
          type="text"
          value={newFileName}
          onChange={text(setNewFileName)}
        />
      </label>
      {error?.message}
      <div className="flex[ ai-c jc-sb ]">
        <button onClick={onCreateFile}>Create</button>
        <button onClick={close}>Close</button>
      </div>
    </form>
  );
};

const NewFileModal = ({ shown, close, createFile }) => {
  return (
    <Modal shown={shown}>
      <NewFileForm createFile={createFile} close={close} />
    </Modal>
  );
};

export default NewFileModal;
