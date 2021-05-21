import React from "react";
import "./ActionBar.scss";

const ActionBar = ({ content }) => {
  return (
    <>
      <div className="c-ActionBar-fade" />
      <div className="c-ActionBar">
        <input
          type="text"
          placeholder="Find anything..."
          aria-label="Find anything"
          autoFocus={true}
        />
      </div>
    </>
  );
};

export default ActionBar;
