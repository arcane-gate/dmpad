import { useState, useEffect } from 'react';
import { JSONCrush, JSONUncrush } from 'jsoncrush';
import createPersistedState from 'use-persisted-state';
import { useDebouncedCallback } from 'use-debounce';
import { CaretDoubleDown } from 'phosphor-react';
import { currentUser } from '../Accounts/auth';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from '../Accounts/config';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const user = currentUser();

// const getRemoteDocuments = async () => {
//   const user = currentUser();
//   const { data, error } = await supabase
//     .from('documents')
//     .select(`*`)
//     .eq('owner_id', user.id);
//   return data;
// };

const createJsonSaveFile = (filename, debounce = 1000) => {
  const useFileState = createPersistedState(filename);

  const getRemoteDocument = async () => {
    return await supabase
      .from('documents')
      .select(`*`)
      .eq('owner_id', user.id)
      .eq('filename', filename);
  };

  const upsertRemoteDocument = async (doc) => {
    return await supabase
      .from('documents')
      .upsert([{ filename, contents: doc, owner_id: user.id }], {
        onConflict: 'filename,owner_id',
      });
  };

  const useRemoteDocuments = (defaultContent) => {
    const [fileState, setFileState] = useState(defaultContent);

    const setRemoteFileState = async (fileState) => {
      const { data, error } = await upsertRemoteDocument(fileState);
      if (!error) {
        setFileState(data);
      }
    };

    return [fileState, setRemoteFileState];
  };

  const useLocalDocuments = (defaultContent) => {
    return useFileState(defaultContent);
  };

  return (defaultContent) => {
    const [fileLocalState, setLocalFileState] =
      useLocalDocuments(defaultContent);
    const [fileRemoteState, setRemoteFileState] =
      useRemoteDocuments(defaultContent);
    const fileState = fileLocalState;
    const [jsonState, setJsonState] = useState(fileState);
    const [autoSaving, setAutoSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    const setFileState = async (state, updateRemote = true) => {
      setLocalFileState(state);
      if (user && updateRemote) {
        await setRemoteFileState(state);
      }
    };

    const debouncedUpdateFileState = useDebouncedCallback((json, updateRemote = true) => {
      setAutoSaving(true);
      setFileState(json, updateRemote).then(() => {
        setAutoSaving(false);
      });
    }, debounce);

    const updateState = (update, updateRemote = true) => {
      let json = update;
      if (typeof update === 'function') {
        json = update(jsonState);
      }
      setJsonState(json);
      debouncedUpdateFileState(json, updateRemote);
    };

    const updateLocalFromRemote = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      const { data, error } = await getRemoteDocument();
      if (data.length === 1) {
        updateState(data[0].contents, false);
      }
      setLoading(false);
    };

    useEffect(() => {
      updateLocalFromRemote();
      let subscribe;
      if (user) {
        subscribe = supabase
          .from('documents')
          .on('*', (payload) => {
            updateLocalFromRemote();
          })
          .subscribe();
      }
      return () => supabase.removeSubscription(subscribe)
    }, [filename]);


    // update document to use new style of JSON
    if (!fileState.hasOwnProperty('content')) {
      updateState({ content: fileState });
    }

    return [jsonState, updateState, autoSaving, loading];
  };
};

export default createJsonSaveFile;
