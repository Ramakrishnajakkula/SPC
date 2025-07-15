import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./HackathonDetails.css";
import Loading from "./Loading";
import { getHackathonUrl } from "../config/api";
import API_CONFIG from "../config/api";

const HackathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHackathonDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          getHackathonUrl(API_CONFIG.ENDPOINTS.HACKATHONS.BY_ID(id))
        );
        setHackathon(response.data);
      } catch (error) {
        console.error("Error fetching hackathon details:", error);
        setError("Failed to load hackathon details");
      } finally {
        setLoading(false);
      }
    };

    fetchHackathonDetails();
  }, [id]);

  const handleRegister = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    navigate(`/hackathon/${id}/register`);
  };

  const handleGoBack = () => {
    navigate("/hackathon");
  };

  if (loading) {
    return <Loading message="Loading hackathon details..." />;
  }

  if (error || !hackathon) {
    return (
      <div className="hackathon-details-page">
        <div className="error-state">
          <h2>Error</h2>
          <p>{error || "Hackathon not found"}</p>
          <button onClick={handleGoBack} className="btn btn-primary">
            Back to Hackathons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="hackathon-details-page">
      
      <div className="hackathon-details-container">
        <div className="hackathon-hero-section">
          <div className="hackathon-badge-container">
            <span className={`status-badge ${hackathon.status}`}>
              {hackathon.status}
            </span>
          </div>
          <h1 className="hackathon-title">{hackathon.title}</h1>
          <p className="hackathon-theme">{hackathon.theme}</p>
          <p className="hackathon-description">{hackathon.shortDescription}</p>

          <div className="hackathon-actions">
            <button
              onClick={handleRegister}
              className="btn btn-primary btn-large"
              disabled={
                hackathon.status === "completed" ||
                hackathon.status === "cancelled"
              }>
              Register Now
            </button>
          </div>
        </div>

        <div className="hackathon-content-grid">
          <div className="hackathon-main-content">
            <section className="hackathon-section">
              <h2>About This Hackathon</h2>
              <div className="hackathon-detailed-description">
                {hackathon.detailedDescription ? (
                  <p>{hackathon.detailedDescription}</p>
                ) : (
                  <p>{hackathon.shortDescription}</p>
                )}
              </div>
            </section>

            {hackathon.rules && (
              <section className="hackathon-section">
                <h2>Rules & Guidelines</h2>
                <div className="hackathon-rules">
                  <p>{hackathon.rules}</p>
                </div>
              </section>
            )}

            {hackathon.schedule && (
              <section className="hackathon-section">
                <h2>Schedule</h2>
                <div className="hackathon-schedule">
                  <p>{hackathon.schedule}</p>
                </div>
              </section>
            )}

            {hackathon.judgingCriteria &&
              hackathon.judgingCriteria.length > 0 && (
                <section className="hackathon-section">
                  <h2>Judging Criteria</h2>
                  <div className="judging-criteria">
                    {hackathon.judgingCriteria.map((criterion, index) => (
                      <div key={index} className="criterion-item">
                        <div className="criterion-header">
                          <h4>{criterion.criterion}</h4>
                          <span className="criterion-weight">
                            {criterion.weight}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {hackathon.prizes && hackathon.prizes.length > 0 && (
              <section className="hackathon-section">
                <h2>Prizes & Rewards</h2>
                <div className="prizes-grid">
                  {hackathon.prizes.map((prize, index) => (
                    <div key={index} className="prize-card">
                      <h4>{prize.position}</h4>
                      <div className="prize-amount">₹{prize.amount}</div>
                      {prize.description && <p>{prize.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="hackathon-sidebar">
            <div className="hackathon-info-card">
              <h3>Event Details</h3>
              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="16"
                        y1="2"
                        x2="16"
                        y2="6"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="8"
                        y1="2"
                        x2="8"
                        y2="6"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="3"
                        y1="10"
                        x2="21"
                        y2="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="info-content">
                    <div className="info-label">Start Date</div>
                    <div className="info-value">
                      {new Date(hackathon.startDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="16"
                        y1="2"
                        x2="16"
                        y2="6"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="8"
                        y1="2"
                        x2="8"
                        y2="6"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="3"
                        y1="10"
                        x2="21"
                        y2="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="info-content">
                    <div className="info-label">End Date</div>
                    <div className="info-value">
                      {new Date(hackathon.endDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="12"
                        cy="10"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="info-content">
                    <div className="info-label">Location</div>
                    <div className="info-value">
                      {hackathon.venue || hackathon.location || "TBD"}
                    </div>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="9"
                        cy="7"
                        r="4"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="info-content">
                    <div className="info-label">Team Size</div>
                    <div className="info-value">
                      {hackathon.teamSizeMin}-{hackathon.teamSizeMax} members
                    </div>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <polyline
                        points="12,6 12,12 16,14"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="info-content">
                    <div className="info-label">Registration Deadline</div>
                    <div className="info-value">
                      {new Date(
                        hackathon.registrationDeadline
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {hackathon.totalPrizePool && (
                  <div className="info-item">
                    <div className="info-icon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <div className="info-content">
                      <div className="info-label">Total Prize Pool</div>
                      <div className="info-value">
                        ₹{hackathon.totalPrizePool}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="hackathon-organizer-card">
              <h3>Organizer</h3>
              <div className="organizer-info">
                <h4>{hackathon.organizerName}</h4>
                <p>{hackathon.organizerEmail}</p>
                {hackathon.organizerPhone && <p>{hackathon.organizerPhone}</p>}
                {hackathon.website && (
                  <a
                    href={hackathon.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="organizer-website">
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetails;
