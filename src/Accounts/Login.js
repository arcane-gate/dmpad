import React, { useEffect, useState } from "react";
import { magic } from "./auth";

const text = (fn) => (e) => fn(e.target.value);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const onSubmit = async (e) => {
    e.preventDefault();
    await magic(email);
  };
  // const onForgot = () => {
  //   forgotPass(email).then(({ data, error }) => {
  //     if (error) setAlert(error);
  //   });
  // };
  return (
    <form onSubmit={onSubmit}>
      <label>
        Email
        <input type="email" value={email} onChange={text(setEmail)} />
      </label>
      <button type="submit">Send me a magic link</button>
      {/*<button type="submit">Login with Twitter</button> */}
      {alert}
    </form>
  );
};

export default Login;
