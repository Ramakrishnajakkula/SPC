import { useState,useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import "./Home.css"
import happeningsImage from "../assets/image.png"
import Logo from "../assets/Logo.png"
import Videos from './Videos';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Update Home.jsx useEffect
useEffect(() => {
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername || "User");
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  };

  checkAuth();
  // Add event listener for storage changes
  window.addEventListener('storage', checkAuth);
  return () => window.removeEventListener('storage', checkAuth);
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
    <div className="home-container">
      <nav className="navbar">
        <div className="brand-container">
          <img src={Logo} alt="Logo" className="nav-logo" />
          <h3 className="brand-text">Techfluence</h3>
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
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </nav>

      <div className="main-content">
        <div className="left-section">
          <h1 className="main-title">
            Techfluence – Where Innovators & Creators Unite
          </h1>
          <p className="main-description">
            The ultimate tech & creator summit at Lovely Professional University.
          </p>
        </div>
        <div className="right-section">
        <img src={happeningsImage || "/placeholder.svg"} alt="Opportunities" className="hero-image" />
        </div>
      </div>
      <div className="home-videos-section">
    <h2>Featured Videos</h2>
      <Videos />
  </div>
    </div>
  );
}

export default Home;