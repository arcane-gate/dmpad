import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Login from "./Login";
import User from "./User";
import Signup from "./Signup";
import Modal from "../components/Modal";
import "./Accounts.scss";
import { currentUser } from "./auth";
import { LoadingOutlined } from "@ant-design/icons";

const Accounts = ({ tab = "login", show = false, hideModal, onUserUpdate }) => {
  const [selectedTab, setSelectedTab] = useState(tab);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = currentUser();
    setLoading(false);
    setUser(user);
  }, []);
  return (
    <Modal shown={show}>
      <div className="c-AccountsModal flow">
        {/* <div className="c-AccountsModal-tabs">
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
          </div> */}
        <p>
          Accounts don't do anything yet, but feel free to create one anyway!
        </p>
        <button onClick={hideModal}>Close</button>
        <hr />
        {user && <User user={user} close={hideModal} />}
        {loading && <LoadingOutlined />}
        {!user && selectedTab === "login" && (
          <Login onUserUpdate={onUserUpdate} />
        )}
        {/* {selectedTab === "signup" && <Signup />} */}
      </div>
    </Modal>
  );
};

export default Accounts;
