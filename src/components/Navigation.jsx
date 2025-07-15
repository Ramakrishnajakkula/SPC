import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/Logo.png";
import ThemeToggle from "./ThemeToggle";
import "./Navigation.css";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (token && storedUsername) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="brand-container">
        <img src={Logo} alt="Logo" className="nav-logo" />
        <h3 className="brand-text">Techinfluence</h3>
      </div>
      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/VideoManagement" className="nav-link">
          Manage Seasons
        </Link>
        <Link to="/Hackathons" className="nav-link">
          Hackathons
        </Link>
        <Link to="/About" className="nav-link">
          About
        </Link>

        {isLoggedIn ? (
          <>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">
              Login
            </Link>
            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </div>
        )}
        <ThemeToggle />
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </nav>
  );
}

export default Navigation;
