import React, { useEffect, useState, useContext } from "react";
import "./styles/styles.scss";

import Editor from "./Editor";
import EditorToolbar from "./EditorToolbar";
import ImportModal from "./modals/ImportModal";
import Accounts from "./Accounts";
import Filesystem, { FilesystemContext } from "./Filesystem";
// import ActionBar from "./ActionBar";
import { currentUser } from "./Accounts/auth";

const DMpad = () => {
  const [loading, setLoading] = useState(true);

  const [actionBarOpen, setActionBarOpen] = useState(false);
  const [accountsShow, setAccountsShow] = useState(false);

  const [user, setUser] = useState(currentUser());

  const onUserUpdate = () => {
    setUser(currentUser());
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
      <Filesystem setLoading={setLoading}>
        {loading && <div>LOADING</div>}
        {!loading && (
          <>
            <EditorToolbar setShowAccounts={setAccountsShow} />
            <Editor />
            <ImportModal />
            <Accounts
              show={accountsShow}
              hideModal={() => setAccountsShow(false)}
              onUserUpdate={onUserUpdate}
            />
          </>
        )}
      </Filesystem>
    </div>
  );
};

export default DMpad;

// {actionBarOpen && (
//   <ActionBar
//     document={currentDocument}
//     fileList={fileList}
//     actions={actions}
//     filename={filename}
//   />
// )}
