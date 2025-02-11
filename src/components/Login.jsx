import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import happeningsImage from "../assets/hack.jpeg";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    
    if (!formData.username || !formData.password) {
      setError("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("https://spc-backend-two.vercel.app/api/auth/login", {
        username: formData.username,
        password: formData.password
      });

      // Store token
      localStorage.setItem("token", response.data.token);
      
      // Redirect to home page
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="happenings">
        <img src={happeningsImage} alt="Happenings" />
      </div>
      <div className="login-frame">
        <div className="login-box">
          <h1 className="login-title">Login</h1>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className={isLoading ? "loading" : ""}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="additional-links">
            <span>Don't have an account?</span>
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;