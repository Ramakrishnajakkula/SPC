import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import happeningsImage from "../assets/hack.jpeg"; // Import the image

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle sign-up logic here
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="signup-container">
      <div className="happenings">
        <img src={happeningsImage} alt="Happenings" />
      </div>
      <div className="signup-frame">
        <div className="signup-box">
          <h1 className="signup-title">Sign Up</h1>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit">Sign Up</button>
          </form>
          <div className="additional-links">
            <a href="#" onClick={() => navigate("/login")} className="login-link">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;