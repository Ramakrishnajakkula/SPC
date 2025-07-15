import "./Home.css";
import happeningsImage from "../assets/image.png";
import Videos from "./Videos";

function Home() {
  return (
    <div className="home-container">
      <div className="main-content">
        <div className="left-section">
          <h1 className="main-title">
            Techinfluence – Where Innovators & Creators Unite
          </h1>
          <p className="main-description">
            The ultimate tech & creator summit at Lovely Professional
            University.
          </p>
        </div>
        <div className="right-section">
          <img
            src={happeningsImage || "/placeholder.svg"}
            alt="Opportunities"
            className="hero-image"
          />
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
