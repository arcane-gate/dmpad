import React, { useState } from "react";
import "./ActionBar.scss";

const ActionBar = ({ document, setFileList, setFilename, fileList }) => {
  console.log(fileList.files);
  const fileListCommands = fileList.files.map((file) => ({
    name: `Switch to ${file}`,
    args: [],
    action: (filename) => {
      setFilename(filename);
    },
  }));
  const newFile = {
    name: "New File...",
    args: ["filename"],
    action: (filename) => {
      if (fileList.includes(filename)) {
        return new Error("File already exists!");
      }
      setFileList([...fileList, filename]);
    },
  };
  const [currentCommand, setCurrentCommand] = useState(null);
  const [search, setSearch] = useState("");
  const commands = [newFile];
  const allContent = [...commands, ...fileListCommands];
  return (
    <>
      <div className="c-ActionBar-fade" />
      <div className="c-ActionBar">
        {currentCommand}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find anything..."
          aria-label="Find anything"
          autoFocus={true}
        />
        {search &&
          allContent
            .reduce((acc, content) => {
              if (content.name.includes(search)) {
                return [...acc, <button>{content.name}</button>];
              }
              return acc;
            }, [])
            .slice(0, 10)}
      </div>
    </>
  );
};

export default ActionBar;
