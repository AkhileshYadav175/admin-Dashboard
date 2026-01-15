import React from "react";
import "./Auth.css";

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Admin Login</h2>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button className="login-btn">Login</button>
      </div>
    </div>
  );
};

export default Login;
