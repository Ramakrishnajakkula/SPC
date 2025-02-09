import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons"
import "./Home.css"
import happeningsImage from "../assets/image.png"

function Home() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-search">
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input type="text" placeholder="Search..." className="search-bar" />
          </div>
        </div>
        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/contests" className="nav-link">
            Contests
          </Link>
          <Link to="/hackathons" className="nav-link">
            Hackathons
          </Link>
          <Link to="/workshops" className="nav-link">
            Workshops
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
          <h1 className="main-title">Unlock Your Opportunities</h1>
          <p className="main-description">
            Discover endless possibilities through competitions, hackathons, and workshops. Join our community and
            showcase your talents to the world.
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

