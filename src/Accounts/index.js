import React, { useState } from "react";
import classNames from "classnames";
import Login from "./Login";
import Signup from "./Signup";
import Modal from "../components/Modal";
import "./Accounts.scss";

const Accounts = ({ tab = "signup", show = false }) => {
  const [selectedTab, setSelectedTab] = useState(tab);
  return (
    show && (
      <Modal>
        <div className="c-AccountsModal">
          <div className="c-AccountsModal-tabs">
            <button
              onClick={() => setSelectedTab("signup")}
              className={classNames({ active: selectedTab === "signup" })}
            >
              Sign Up
            </button>
            <button
              onClick={() => setSelectedTab("login")}
              className={classNames({ active: selectedTab === "login" })}
            >
              Login
            </button>
          </div>
          {selectedTab === "login" && <Login />}
          {selectedTab === "signup" && <Signup />}
        </div>
      </Modal>
    )
  );
};

export default Accounts;
