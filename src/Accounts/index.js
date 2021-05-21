import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Modal from "../components/Modal";

const Accounts = ({ tab = "signup", show = false }) => {
  const [selectedTab, setSelectedTab] = useState(tab);
  return (
    show && (
      <Modal>
        <div>
          {selectedTab === "login" && <Login />}
          {selectedTab === "signup" && <Signup />}
          <button>Sign Up</button>
          <button>Login</button>
        </div>
      </Modal>
    )
  );
};

export default Accounts;
