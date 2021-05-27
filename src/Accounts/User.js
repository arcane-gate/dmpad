import React from "react";

const User = ({ user, close }) => {
  return (
    <div>
      <h2>You're logged in!</h2> hey {user.user_metadata.full_name}!
      <br />
      <br />
      <button onClick={close}>Close</button>
    </div>
  );
};

export default User;
