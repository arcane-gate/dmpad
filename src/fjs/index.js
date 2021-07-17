/*
------
|  F |
| JS |
------

A simple Javascript Filesystem

*/

import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

const storage = window.localStorage;

export const convertNameToFile = (name) => name.replace(/\s/g, "-");
export const convertFileToName = (file) => file.replace(/[-]/g, " ");

const log =
  (fn, fnName) =>
  (...args) => {
    console.log(fnName, args);
    return fn(...args);
  };

const prefixFirstArg =
  (prefix, fn) =>
  (firstArg, ...args) =>
    fn(convertNameToFile(`${prefix}:${firstArg || ""}`), ...args);

const unPrefixFirstArg = (prefix, str) => str.replace(`${prefix}:`, "");

const fileExists = (name) => storage.getItem(name) !== null;

const saveFile = (name, content = {}) =>
  storage.setItem(name, JSON.stringify(content));

const createFile = (name, content) => {
  if (fileExists(name)) {
    throw new Error("File already exists");
  }
  saveFile(name, content);
};

const readFile = (name) => {
  const file = storage.getItem(name);
  if (file) {
    return JSON.parse(file);
  } else {
    throw new Error(`${file} not found`);
  }
};

const readDir = (prefix) => (name) =>
  Object.entries(storage).reduce((acc, [fileId, file]) => {
    if (fileId.startsWith(prefix)) {
      const fileParsed = JSON.parse(file);
      return [
        ...acc,
        {
          fileId: file,
          fileName: fileParsed?.fileName,
        },
      ];
    }
    return acc;
  }, []);

const fs = (prefix) => {
  return {
    saveFile: prefixFirstArg(prefix, saveFile),
    createFile: prefixFirstArg(prefix, createFile),
    readFile: prefixFirstArg(prefix, readFile),
    fileExists: prefixFirstArg(prefix, fileExists),
    readDir: prefixFirstArg(prefix, readDir(prefix)),
  };
};

export const useFile =
  (filesystem) =>
  (fileName, defaultState = {}, debounce = 1000) => {
    const [file, setFile] = useState(defaultState);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
      try {
        setFile(filesystem.readFile(fileName));
      } catch (err) {
        filesystem.saveFile(fileName, { fileName, ...defaultState });
        setFile(filesystem.readFile(fileName));
      }
    }, [fileName]);

    const storeFile = (file, cb) => {
      setSaving(true);
      filesystem.saveFile(fileName, file);
      setTimeout(() => {
        setSaving(false);
      }, 100);
      cb();
    };

    const updateFileName = (fileName, cb = () => {}) => {
      const newFile = {
        ...file,
        fileName,
      };
      storeFile(newFile, cb);
      setFile(newFile);
    };

    const updateFile = useDebouncedCallback((content, cb = () => {}) => {
      const newFile = {
        ...file,
        content,
      };
      storeFile(newFile, cb);
      setFile(newFile);
    }, debounce);
    return [file, updateFile, updateFileName, saving];
  };

const useDir = (filesystem) => () => {
  const [dir, setDir] = useState(filesystem.readDir());
  const readDir = () => {
    setDir(filesystem.readDir());
  };

  const createFile = (name, content) => {
    filesystem.createFile(name, { fileName: name, ...content });
    readDir();
  };
  return [dir, readDir, createFile];
};

export const createFilesystem = (name) => {
  const filesystem = fs(name);
  return {
    useFile: useFile(filesystem),
    useDir: useDir(filesystem),
  };
};

export default fs;
