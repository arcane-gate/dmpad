import "./styles/styles.scss";

import Editor from "./Editor";
import ImportModal from "./ImportModal";
import Accounts from "./Accounts";
import { useEffect, useState } from "react";
import ActionBar from "./ActionBar";

const DMpad = () => {
  const [actionBarOpen, setActionBarOpen] = useState(false);
  const handleKeys = (event) => {
    if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
      event.stopPropagation();
      event.preventDefault();
      setActionBarOpen(true);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeys);
    return () => document.removeEventListener("keydown", handleKeys);
  });
  return (
    <div className="DMpad AppFrame">
      <Editor />
      <ImportModal />
      <Accounts />
      {actionBarOpen && <ActionBar />}
    </div>
  );
};

export default DMpad;
