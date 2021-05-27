import React, { useEffect, useState } from "react";
import { loginWithTwitter, currentUser } from "./auth";

const text = (fn) => (e) => fn(e.target.value);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    loginWithTwitter().then(console.log);
    // login(email, password).then(console.log);
  };
  // const onForgot = () => {
  //   forgotPass(email).then(({ data, error }) => {
  //     if (error) setAlert(error);
  //   });
  // };
  return (
    <form onSubmit={onSubmit}>
      {/* <label>
        Email
        <input type="email" value={email} onChange={text(setEmail)} />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={text(setPassword)} />
      </label> */}
      {/* <button type="submit">Login</button> */}
      <button type="submit">Login with Twitter</button>
      {/* <button type="button" onClick={onForgot}>
        Forgot Password
      </button> */}
      {alert}
    </form>
  );
};

export default Login;
