import React from 'react';
import { currentUser } from '../Accounts/auth';

const EditorSidebar = ({ currentContent }) => {
  const user = currentUser();
  return <div className="c-EditorSidebar">{user.email}</div>;
};
