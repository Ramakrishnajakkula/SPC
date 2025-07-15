import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="not-found-number">404</div>
          <h1 className="not-found-title">Page Not Found</h1>
          <p className="not-found-message">
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might
            have been moved, deleted, or you entered the wrong URL.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="not-found-button primary">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 22V12H15V22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="not-found-button secondary">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 12H5M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Go Back
            </button>
          </div>
        </div>
        <div className="not-found-illustration">
          <svg viewBox="0 0 400 300" className="not-found-svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ff8a50" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Rocket */}
            <g transform="translate(200, 150)">
              <ellipse
                cx="0"
                cy="20"
                rx="30"
                ry="15"
                fill="url(#grad1)"
                opacity="0.3"
                className="rocket-shadow"
              />
              <path
                d="M-15,-40 L0,-60 L15,-40 L10,-10 L-10,-10 Z"
                fill="url(#grad1)"
                className="rocket-body"
              />
              <circle cx="0" cy="-35" r="8" fill="white" opacity="0.9" />
              <path
                d="M-10,-10 L-20,10 L-5,5 Z"
                fill="#ff6b35"
                className="rocket-fin"
              />
              <path
                d="M10,-10 L20,10 L5,5 Z"
                fill="#ff6b35"
                className="rocket-fin"
              />
              <path
                d="M-5,5 L0,20 L5,5 Z"
                fill="#ff8a50"
                className="rocket-flame"
              />
            </g>

            {/* Stars */}
            <circle
              cx="80"
              cy="60"
              r="2"
              fill="var(--accent)"
              className="star"
              style={{ animationDelay: "0s" }}
            />
            <circle
              cx="320"
              cy="80"
              r="1.5"
              fill="var(--accent)"
              className="star"
              style={{ animationDelay: "0.5s" }}
            />
            <circle
              cx="100"
              cy="200"
              r="1"
              fill="var(--accent)"
              className="star"
              style={{ animationDelay: "1s" }}
            />
            <circle
              cx="350"
              cy="180"
              r="2"
              fill="var(--accent)"
              className="star"
              style={{ animationDelay: "1.5s" }}
            />
            <circle
              cx="50"
              cy="120"
              r="1.5"
              fill="var(--accent)"
              className="star"
              style={{ animationDelay: "2s" }}
            />

            {/* Planets */}
            <circle
              cx="350"
              cy="250"
              r="20"
              fill="url(#grad1)"
              opacity="0.6"
              className="planet"
            />
            <circle
              cx="60"
              cy="250"
              r="15"
              fill="var(--accent)"
              opacity="0.4"
              className="planet"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
