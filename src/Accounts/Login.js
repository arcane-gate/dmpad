import React, { useState } from "react";
import { login } from "./auth";

const text = (fn) => (e) => fn(e.target.value);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = () => {};
  return (
    <form onSubmit>
      <label>
        Email
        <input type="email" value={email} onChange={text(setEmail)} />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={text(setPassword)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
