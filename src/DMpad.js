import "./styles/styles.scss";

import Editor from "./Editor";
import ImportModal from "./ImportModal";
import { useEffect } from "react";

const handleKeys = (event) => {
  if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
    event.stopPropagation();
    event.preventDefault();
    alert("SEARCH");
  }
};

const DMpad = () => {
  useEffect(() => {
    document.addEventListener("keydown", handleKeys);
    return () => document.removeEventListener("keydown", handleKeys);
  });
  return (
    <div className="DMpad AppFrame">
      <Editor />
      <ImportModal />
    </div>
  );
};

export default DMpad;
