import React, { useState } from 'react';
import { currentUser } from '../Accounts/auth';
import './ActionBar.scss';
import fs from '../fjs';

const ActionBar = ({ filename, actions }) => {
  const user = currentUser();
  const fileSystem = fs('dmpad');
  const fileList = fileSystem.readDir();
  console.log(fileList);

  const fileListCommands = fileList
    .map((file) => ({
      name: `Switch to ${file}`,
      file: file,
      args: [],
      action: () => {
        actions.setFilename(file);
      },
    }))
    .filter((f) => f.file !== filename);

  // const newFile = {
  //   name: 'New File...',
  //   args: ['filename'],
  //   action: actions.newFile
  // };
  const [currentCommand, setCurrentCommand] = useState(null);
  const [search, setSearch] = useState('');
  // const commands = [newFile];
  // const allContent = [...commands, ...fileListCommands];
  const allContent = [...fileListCommands];
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
        {allContent
          .reduce((acc, content) => {
            if (
              !search ||
              content.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return [
                ...acc,
                <button onClick={content.action}>{content.name}</button>,
              ];
            }
            return acc;
          }, [])
          .slice(0, 10)}
      </div>
    </>
  );
};

export default ActionBar;
