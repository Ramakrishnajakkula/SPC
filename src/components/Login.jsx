import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import happeningsImage from "../assets/hack.jpeg";
import ThemeToggle from "./ThemeToggle";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.username || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.username)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);



    try {
      const response = await axios.post(
        "https://spc-backend-two.vercel.app/api/auth/login",
        {
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login response:", response.data); // Debug log

      // Store token and username
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", formData.username);

        // Trigger storage event for other components
        window.dispatchEvent(new Event("storage"));

        // Redirect to home page
        navigate("/");
      } else {
        setError("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error); // Debug log
      if (error.response) {
        // Server responded with error status
        setError(
          error.response.data?.message ||
            error.response.data?.error ||
            `Login failed: ${error.response.status}`
        );
      } else if (error.request) {
        // Network error
        setError("Network error. Please check your connection.");
      } else {
        // Other error
        setError("Login failed. Please try again.");
      }
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
          <div className="login-header">
            <h1 className="login-title">Login</h1>
            <ThemeToggle />
          </div>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                type="email"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={isLoading ? "loading" : ""}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="additional-links">
            <span>Don&apos;t have an account?</span>
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
