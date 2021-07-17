import React, { useState, useEffect, useRef } from "react";
import ddbImport from "../import";
import Modal from "../components/Modal";

const ImportModal = () => {
  const [importUrl, setImportUrl] = useState("");
  const [showing, setShowing] = useState(false);
  const rangeRef = useRef(null);
  const importRef = useRef(null);
  const onCreate = (e) => {
    const { editor, range } = e.detail;
    rangeRef.current = range;
    setShowing(true);
  };
  useEffect(() => {
    document.addEventListener("ddbImport", onCreate);
    if (importRef.current) importRef.current.focus();
    return () => {
      document.removeEventListener("ddbImport", onCreate);
    };
  });
  const onImport = () => {
    if (!importUrl) {
      return;
    }
    if (!(window.editor && rangeRef.current)) {
      setShowing(false);
      return;
    }
    ddbImport(importUrl)
      .then((data) => {
        return window.editor
          .chain()
          .focus()
          .insertContentAt(rangeRef.current, data)
          .run();
      })
      .then(() => {
        rangeRef.current = null;
        setShowing(false);
      });
  };
  return (
    showing && (
      <Modal>
        <div className="ImportModal">
          <input
            onChange={(e) => setImportUrl(e.target.value)}
            ref={importRef}
            value={importUrl}
            placeholder="https://www.dndbeyond.com/..."
            type="text"
          />
          <button onClick={onImport}>Import</button>
        </div>
      </Modal>
    )
  );
};

export default ImportModal;
