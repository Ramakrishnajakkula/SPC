import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";
import happeningsImage from "../assets/hack.jpeg";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 
        "Password must be at least 8 characters with 1 uppercase, 1 lowercase and 1 number";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("https://spc-backend-two.vercel.app/api/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || "Signup failed. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="happenings">
        <img src={happeningsImage} alt="Happenings" />
      </div>
      <div className="signup-frame">
        <div className="signup-box">
          <h1 className="signup-title">Sign Up</h1>
          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <input
                type="text"
                name="username"
                value={formData.username}
                placeholder="Enter username"
                onChange={handleChange}
              />
              {errors.username && (
                <span className="error-text">{errors.username}</span>
              )}
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter email"
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter password"
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Confirm password"
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword}</span>
              )}
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className={isLoading ? "loading" : ""}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <div className="additional-links">
            <Link to="/login" 
            className="login-link"
            >
            Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;