import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Hackathon.css";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import API_CONFIG, { getHackathonUrl } from "../config/api";

const Hackathon = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "browse"
  );
  const [hackathons, setHackathons] = useState([]);
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [userCreatedHackathons, setUserCreatedHackathons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRegistrations = async () => {
      try {
        console.log("Fetching user registrations...");
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found, skipping registrations fetch");
          return;
        }

        const response = await axios.get(
          getHackathonUrl(API_CONFIG.ENDPOINTS.REGISTRATIONS.MY),
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("User registrations response:", response.data);
        console.log("Registrations array:", response.data.registrations);
        setUserRegistrations(response.data.registrations || []);
      } catch (error) {
        console.error("Error fetching user registrations:", error);
        console.error("Error response:", error.response?.data);

        // Handle authentication errors
        if (
          error.response?.status === 401 ||
          error.response?.data?.message === "Token is not valid"
        ) {
          console.log("Token expired or invalid, redirecting to login");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setUserRegistrations([]);
      }
    };

    fetchHackathons();
    if (localStorage.getItem("token")) {
      fetchUserCreatedHackathons();
      fetchUserRegistrations();
    }
  }, [navigate]);

  // Add effect to refresh data when tab changes
  useEffect(() => {
    const fetchUserRegistrationsOnTabChange = async () => {
      try {
        console.log("Fetching user registrations...");
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found, skipping registrations fetch");
          return;
        }

        const response = await axios.get(
          getHackathonUrl(API_CONFIG.ENDPOINTS.REGISTRATIONS.MY),
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("User registrations response:", response.data);
        console.log("Registrations array:", response.data.registrations);
        setUserRegistrations(response.data.registrations || []);
      } catch (error) {
        console.error("Error fetching user registrations:", error);
        console.error("Error response:", error.response?.data);

        // Handle authentication errors
        if (
          error.response?.status === 401 ||
          error.response?.data?.message === "Token is not valid"
        ) {
          console.log("Token expired or invalid, redirecting to login");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setUserRegistrations([]);
      }
    };

    if (activeTab === "browse") {
      fetchHackathons();
    } else if (activeTab === "my-created" && localStorage.getItem("token")) {
      fetchUserCreatedHackathons();
    } else if (activeTab === "registered" && localStorage.getItem("token")) {
      fetchUserRegistrationsOnTabChange();
    }
  }, [activeTab, navigate]);

  const fetchHackathons = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        getHackathonUrl(API_CONFIG.ENDPOINTS.HACKATHONS.BASE)
      );
      console.log("Browse hackathons response:", response.data);
      setHackathons(response.data.hackathons || []);
    } catch (error) {
      console.error("Error fetching hackathons:", error);
      setHackathons([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCreatedHackathons = async () => {
    try {
      const response = await axios.get(
        getHackathonUrl(API_CONFIG.ENDPOINTS.HACKATHONS.USER),
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("User created hackathons response:", response.data);
      setUserCreatedHackathons(response.data || []);
    } catch (error) {
      console.error("Error fetching user created hackathons:", error);
      setUserCreatedHackathons([]);
    }
  };

  const handleCreateHackathon = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    navigate("/hackathon/create");
  };

  const handleRegisterHackathon = (hackathonId) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    navigate(`/hackathon/${hackathonId}/register`);
  };

  const handlePublishHackathon = async (hackathonId) => {
    try {
      const response = await axios.post(
        getHackathonUrl(API_CONFIG.ENDPOINTS.HACKATHONS.PUBLISH(hackathonId)),
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("Hackathon published:", response.data);
      // Refresh the created hackathons list
      fetchUserCreatedHackathons();
      // Also refresh browse hackathons if we're on that tab
      if (activeTab === "browse") {
        fetchHackathons();
      }
    } catch (error) {
      console.error("Error publishing hackathon:", error);
      alert("Failed to publish hackathon. Please try again.");
    }
  };

  const handleUnpublishHackathon = async (hackathonId) => {
    try {
      // Update the hackathon to set isPublished to false
      const response = await axios.put(
        getHackathonUrl(API_CONFIG.ENDPOINTS.HACKATHONS.BY_ID(hackathonId)),
        { isPublished: false },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("Hackathon unpublished:", response.data);
      // Refresh the created hackathons list
      fetchUserCreatedHackathons();
      // Also refresh browse hackathons if we're on that tab
      if (activeTab === "browse") {
        fetchHackathons();
      }
    } catch (error) {
      console.error("Error unpublishing hackathon:", error);
      alert("Failed to unpublish hackathon. Please try again.");
    }
  };

  const filteredHackathons = (hackathons || []).filter(
    (hackathon) =>
      hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hackathon.theme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading message="Loading hackathons..." />;
  }

  return (
    <div className="hackathon-page">
      <div className="hackathon-header">
        <div className="hackathon-hero">
          <h1 className="hackathon-title">Hackathon Hub</h1>
          <p className="hackathon-subtitle">
            Discover amazing hackathons, register to participate, or create your
            own!
          </p>

          
        </div>

        <div className="hackathon-tabs">
            <SearchBar
                onSearch={setSearchTerm}
                placeholder="Search hackathons by title"
                className="hackathon-search"
              />
          <button
            className={`tab-button ${activeTab === "browse" ? "active" : ""}`}
            onClick={() => setActiveTab("browse")}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="11"
                cy="11"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Browse Hackathons
          </button>
          {localStorage.getItem("token") && (
            <button
              className={`tab-button ${
                activeTab === "registered" ? "active" : ""
              }`}
              onClick={() => setActiveTab("registered")}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="8.5"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M20 8V14M17 11H23"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              My Registrations
            </button>
          )}
          {localStorage.getItem("token") && (
            <button
              className={`tab-button ${
                activeTab === "my-created" ? "active" : ""
              }`}
              onClick={() => setActiveTab("my-created")}>
              
              My Created Hackathons
            </button>
            
          )}
          <div className="hackathon-actions">
            <button onClick={handleCreateHackathon} className="btn btn-primary">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Create Hackathon
            </button>
          </div>
        </div>
      </div>

      <div className="hackathon-content">
        {activeTab === "browse" && (
          <div className="browse-section">
            <div className="browse-header">
              
              <div className="hackathon-stats">
                <span className="stats-item">
                  <strong>{filteredHackathons.length}</strong> hackathons
                  available
                </span>
              </div>
            </div>

            <div className="hackathons-grid">
              {filteredHackathons.map((hackathon) => (
                <div key={hackathon._id} className="hackathon-card">
                  <div className="hackathon-card-header">
                    <div className="hackathon-badge">
                      <span className={`status-badge ${hackathon.status}`}>
                        {hackathon.status}
                      </span>
                    </div>
                    <h3 className="hackathon-card-title">{hackathon.title}</h3>
                    <p className="hackathon-theme">{hackathon.theme}</p>
                  </div>

                  <div className="hackathon-card-body">
                    <p className="hackathon-description">
                      {hackathon.shortDescription}
                    </p>

                    <div className="hackathon-details">
                      <div className="detail-item">
                        <svg
                          width="16"
                          height="16"
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
                        <span>
                          {new Date(hackathon.startDate).toLocaleDateString()} -{" "}
                          {new Date(hackathon.endDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="detail-item">
                        <svg
                          width="16"
                          height="16"
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
                        <span>{hackathon.venue}</span>
                      </div>

                      <div className="detail-item">
                        <svg
                          width="16"
                          height="16"
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
                          <path
                            d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.7071C21.7033 16.0601 20.9889 15.6137 20.2 15.441"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 18.9972 6.11683 18.9972 7.005C18.9972 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>
                          {hackathon.teamSizeMin}-{hackathon.teamSizeMax}{" "}
                          members
                        </span>
                      </div>
                    </div>

                    <div className="hackathon-prizes">
                      <h4>Prizes:</h4>
                      <div className="prize-list">
                        {hackathon.prizes.slice(0, 2).map((prize, index) => (
                          <span key={index} className="prize-tag">
                            {prize.category}: ${prize.amount}
                          </span>
                        ))}
                        {hackathon.prizes.length > 2 && (
                          <span className="prize-more">
                            +{hackathon.prizes.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="hackathon-card-footer">
                    <button
                      onClick={() => navigate(`/hackathon/${hackathon._id}`)}
                      className="btn btn-secondary">
                      View Details
                    </button>
                    <button
                      onClick={() => handleRegisterHackathon(hackathon._id)}
                      className="btn btn-primary"
                      disabled={
                        hackathon.status === "completed" ||
                        hackathon.status === "cancelled"
                      }>
                      Register
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredHackathons.length === 0 && (
              <div className="empty-state">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M21 21L16.65 16.65"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <h3>No hackathons found</h3>
                <p>
                  Try adjusting your search or check back later for new
                  hackathons.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "registered" && (
          <div className="registered-section">
            <h2>My Registered Hackathons</h2>
            {userRegistrations.length === 0 ? (
              <div className="empty-state">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="8.5"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <h3>No registrations yet</h3>
                <p>
                  You haven&apos;t registered for any hackathons yet. Browse
                  available hackathons to get started!
                </p>
                <button
                  onClick={() => setActiveTab("browse")}
                  className="btn btn-primary">
                  Browse Hackathons
                </button>
              </div>
            ) : (
              <div className="registered-grid">
                {userRegistrations.map((registration) => (
                  <div key={registration._id} className="registration-card">
                    <div className="registration-header">
                      <h3>{registration.hackathon.title}</h3>
                      <span className={`status-badge ${registration.status}`}>
                        {registration.status}
                      </span>
                    </div>
                    <div className="registration-details">
                      <p>
                        <strong>Team:</strong> {registration.teamName || "Solo"}
                      </p>
                      <p>
                        <strong>Registered:</strong>{" "}
                        {new Date(
                          registration.registeredAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="registration-actions">
                      <button
                        onClick={() =>
                          navigate(
                            `/hackathon/registration/${registration._id}`
                          )
                        }
                        className="btn btn-secondary">
                        Edit Registration
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/hackathon/${registration.hackathon._id}`)
                        }
                        className="btn btn-primary">
                        View Hackathon
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "my-created" && (
          <div className="my-created-section">
            <div className="section-header">
              <h2>My Created Hackathons</h2>
              <p>Manage hackathons you&apos;ve created</p>
            </div>

            {userCreatedHackathons.length === 0 ? (
              <div className="empty-state">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3>No hackathons created yet</h3>
                <p>
                  You haven&apos;t created any hackathons yet. Start by creating
                  your first hackathon!
                </p>
                <button
                  onClick={handleCreateHackathon}
                  className="btn btn-primary">
                  Create Hackathon
                </button>
              </div>
            ) : (
              <div className="created-grid">
                {userCreatedHackathons.map((hackathon) => (
                  <div key={hackathon._id} className="hackathon-card">
                    <div className="hackathon-card-header">
                      <div className="hackathon-badge">
                        <span
                          className={`status-badge ${
                            hackathon.isPublished ? "published" : "draft"
                          }`}>
                          {hackathon.isPublished ? "Published" : "Draft"}
                        </span>
                      </div>
                      <h3 className="hackathon-card-title">
                        {hackathon.title}
                      </h3>
                    </div>

                    <div className="hackathon-card-content">
                      <p className="hackathon-description">
                        {hackathon.shortDescription}
                      </p>

                      <div className="hackathon-details">
                        <div className="detail-item">
                          <svg
                            width="16"
                            height="16"
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
                          <span>
                            {new Date(hackathon.startDate).toLocaleDateString()}{" "}
                            - {new Date(hackathon.endDate).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="detail-item">
                          <svg
                            width="16"
                            height="16"
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
                          <span>₹{hackathon.totalPrizePool || "0"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="hackathon-card-actions">
                      <button
                        onClick={() =>
                          navigate(`/hackathon/edit/${hackathon._id}`)
                        }
                        className="btn btn-secondary">
                        Edit
                      </button>
                      {!hackathon.isPublished ? (
                        <button
                          onClick={() => handlePublishHackathon(hackathon._id)}
                          className="btn btn-success">
                          Publish
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleUnpublishHackathon(hackathon._id)
                          }
                          className="btn btn-warning">
                          Unpublish
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/hackathon/${hackathon._id}`)}
                        className="btn btn-primary">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hackathon;
