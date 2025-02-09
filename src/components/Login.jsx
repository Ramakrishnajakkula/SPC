import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import happeningsImage from "../assets/hack.jpeg"; // Import the image

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <div className="happenings">
        <img src={happeningsImage} alt="Happenings" />
      </div>
      <div className="login-frame">
        <div className="login-box">
          <h1 className="login-title">Login</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <div className="additional-links">
            <Link to="/signup" className="signup-link">Sign Up</Link>
            <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;