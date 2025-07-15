// VideoManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./VideoManagement.css";
import { getHackathonUrl } from "../config/api";
import API_CONFIG from "../config/api";

const VideoManagement = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [videoData, setVideoData] = useState({
    title: "",
    youtubeUrl: "",
    seasonNumber: "",
    isShort: false,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchVideos();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setIsAuthenticated(true);
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        getHackathonUrl(API_CONFIG.ENDPOINTS.VIDEOS.BASE)
      );
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        getHackathonUrl(API_CONFIG.ENDPOINTS.VIDEOS.BASE),
        videoData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Video added successfully!");
      setVideoData({
        title: "",
        youtubeUrl: "",
        seasonNumber: "",
        isShort: false,
      });
      fetchVideos();
    } catch (error) {
      alert("Error adding video");
      console.error(error);
    }
  };

  const handleDelete = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) {
      return;
    }

    try {
      await axios.delete(
        getHackathonUrl(API_CONFIG.ENDPOINTS.VIDEOS.BY_ID(videoId)),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Video deleted successfully!");
      fetchVideos();
    } catch (error) {
      alert("Error deleting video");
      console.error(error);
    }
  };

  if (!isAuthenticated) {
    return <div>Please login to access this page.</div>;
  }

  return (
    <div className="vid-mgmt-page">
      <div className="vid-mgmt-header">
        <h1 className="vid-mgmt-main-title">Season Management</h1>
        <p className="vid-mgmt-subtitle">
          Add and manage your video content seasons
        </p>
      </div>

      <div className="vid-mgmt-grid">
        {/* Add Video Section */}
        <div className="vid-mgmt-card vid-mgmt-add-section">
          <div className="vid-mgmt-card-header">
            <div className="vid-mgmt-header-icon">
              <svg
                width="24"
                height="24"
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
            </div>
            <h2 className="vid-mgmt-card-title">Add New Video</h2>
          </div>

          <form onSubmit={handleSubmit} className="vid-mgmt-form">
            <div className="vid-mgmt-form-row">
              <div className="vid-mgmt-input-group">
                <label className="vid-mgmt-label">Video Title</label>
                <input
                  type="text"
                  placeholder="Enter video title"
                  value={videoData.title}
                  onChange={(e) =>
                    setVideoData({ ...videoData, title: e.target.value })
                  }
                  required
                  className="vid-mgmt-input"
                />
              </div>
            </div>

            <div className="vid-mgmt-form-row">
              <div className="vid-mgmt-input-group">
                <label className="vid-mgmt-label">YouTube URL</label>
                <input
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={videoData.youtubeUrl}
                  onChange={(e) =>
                    setVideoData({ ...videoData, youtubeUrl: e.target.value })
                  }
                  required
                  className="vid-mgmt-input"
                />
              </div>
            </div>

            <div className="vid-mgmt-form-row vid-mgmt-form-row-split">
              <div className="vid-mgmt-input-group">
                <label className="vid-mgmt-label">Season Number</label>
                <input
                  type="number"
                  placeholder="1"
                  min="1"
                  value={videoData.seasonNumber}
                  onChange={(e) =>
                    setVideoData({ ...videoData, seasonNumber: e.target.value })
                  }
                  required
                  className="vid-mgmt-input"
                />
              </div>

              <div className="vid-mgmt-input-group">
                <label className="vid-mgmt-label">Video Type</label>
                <div className="vid-mgmt-toggle-container">
                  <label className="vid-mgmt-toggle">
                    <input
                      type="checkbox"
                      checked={videoData.isShort}
                      onChange={(e) =>
                        setVideoData({
                          ...videoData,
                          isShort: e.target.checked,
                        })
                      }
                      className="vid-mgmt-toggle-input"
                    />
                    <span className="vid-mgmt-toggle-slider">
                      <span className="vid-mgmt-toggle-text">
                        {videoData.isShort ? "Short" : "Long"}
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" className="vid-mgmt-submit">
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
              Add Video to Season
            </button>
          </form>
        </div>

        {/* Videos List Section */}
        <div className="vid-mgmt-card vid-mgmt-list-section">
          <div className="vid-mgmt-card-header">
            <div className="vid-mgmt-header-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M10 9L15 12L10 15V9Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="vid-mgmt-card-title">
              Season Videos ({videos.length})
            </h2>
          </div>

          <div className="vid-mgmt-list">
            {videos.length === 0 ? (
              <div className="vid-mgmt-empty-state">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M10 9L15 12L10 15V9Z" fill="currentColor" />
                </svg>
                <h3>No videos yet</h3>
                <p>Add your first video to get started</p>
              </div>
            ) : (
              videos.map((video) => (
                <div key={video._id} className="vid-mgmt-item">
                  <div className="vid-mgmt-item-content">
                    <div className="vid-mgmt-item-header">
                      <h4 className="vid-mgmt-item-title">{video.title}</h4>
                      <div className="vid-mgmt-item-badges">
                        <span className="vid-mgmt-badge vid-mgmt-badge-season">
                          Season {video.seasonNumber}
                        </span>
                        {video.isShort && (
                          <span className="vid-mgmt-badge vid-mgmt-badge-short">
                            Short
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="vid-mgmt-item-meta">
                      <a
                        href={video.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="vid-mgmt-item-url">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11M15 3H21V9M10 14L21 3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Watch on YouTube
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(video._id)}
                    className="vid-mgmt-delete-btn"
                    title="Delete video">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3 6H5H21M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6H19Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 11V17M14 11V17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoManagement;
