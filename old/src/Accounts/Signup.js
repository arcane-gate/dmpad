import React from "react";
import { signup } from "./auth";

const Signup = () => {
  return (
    <form>
      <label>
        Email
        <input type="email" />
      </label>
      <label>
        Password
        <input type="password" />
      </label>
      <label>
        Confirm Password
        <input type="password" />
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
};

export default Signup;
