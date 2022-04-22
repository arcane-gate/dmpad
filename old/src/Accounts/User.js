import React from 'react';

const User = ({ user, close }) => {
  return (
    <div>
      <h2>hey {user.email}!</h2>
      <h3>You're logged in!</h3>
      <p>
        We don't store any other information about you other than your email and
        the documents you create. We never look at any of your data and we don't
        track any analytics besides who logs in, and even then just so we know
        how people are using the service!
      </p>
      <br />
      <button onClick={close}>Close</button>
    </div>
  );
};

export default User;
