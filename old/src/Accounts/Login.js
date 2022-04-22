import React, { useState } from "react";
import { magic } from "./auth";

const text = (fn) => (e) => fn(e.target.value);

const Login = ({ onUserUpdate }) => {
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState(null);
  const onSubmit = async (e) => {
    e.preventDefault();
    const { user, error } = await magic(email);
    if (error) {
      setNotice(error);
    } else {
      setNotice("We sent a login link to your email!");
      onUserUpdate(user);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <p>
        There is no sign up process - just put in your email and we'll either
        log you in or create a new account!
      </p>
      <label>
        Email
        <input type="email" value={email} onChange={text(setEmail)} />
      </label>
      <button type="submit">Send me a magic link</button>
      {notice}
    </form>
  );
};

export default Login;
