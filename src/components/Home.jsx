import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import "./Home.css"
import happeningsImage from "../assets/image.png"
import Logo from "../assets/Logo.png"


function Home() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="home-container">
      <nav className="navbar">
      <div className="brand-container">
          <img src={Logo || "/logo.svg"} alt="Logo" className="nav-logo" />
          <h3 className="brand-text">Techfluence</h3>
      </div>
        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/Seasons" className="nav-link">
            Seasons
          </Link>
          <Link to="/Hackathons" className="nav-link">
            Hackathons
          </Link>
          <Link to="/About" className="nav-link">
            About
          </Link>
          <button onClick={() => navigate("/login")} className="logout-btn">
            Logout
          </button>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </nav>

      <div className="main-content">
        <div className="left-section">
          <h1 className="main-title">Techfluence – Where Innovators & Creators Unite</h1>
          <p className="main-description">
          The ultimate tech & creator summit at Lovely Professional University.
          </p>
        </div>
        <div className="right-section">
          <img src={happeningsImage || "/placeholder.svg"} alt="Opportunities" className="hero-image" />
        </div>
      </div>
    </div>
  )
}

export default Home

