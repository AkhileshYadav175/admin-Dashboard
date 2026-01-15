import React from "react";
import "./Users.css";

const AddUser = () => {
  return (
    <div>
      <h1 className="page-title">Add User</h1>

      <div className="card">
        <form className="user-form">
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button className="btn edit">Save User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
