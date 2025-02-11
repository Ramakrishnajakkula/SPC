// VideoManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./VideoManagement.css";

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
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    setIsAuthenticated(true);
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/videos');
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://spc-backend-two.vercel.app/api/videos", videoData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
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
    if (!window.confirm('Are you sure you want to delete this video?')) {
      return;
    }

    try {
      await axios.delete(`https://spc-backend-two.vercel.app/api/videos/${videoId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Video deleted successfully!');
      fetchVideos();
    } catch (error) {
      alert('Error deleting video');
      console.error(error);
    }
  };

  if (!isAuthenticated) {
    return <div>Please login to access this page.</div>;
  }

  return (
    <div className="vid-mgmt-container">
      <h2 className="vid-mgmt-title">Add New Video</h2>
      <form onSubmit={handleSubmit} className="vid-mgmt-form">
        <div className="vid-mgmt-input-group">
          <input
            type="text"
            placeholder="Video Title"
            value={videoData.title}
            onChange={(e) =>
              setVideoData({ ...videoData, title: e.target.value })
            }
            required
            className="vid-mgmt-input"
          />
        </div>
        <div className="vid-mgmt-input-group">
          <input
            type="text"
            placeholder="YouTube URL"
            value={videoData.youtubeUrl}
            onChange={(e) =>
              setVideoData({ ...videoData, youtubeUrl: e.target.value })
            }
            required
            className="vid-mgmt-input"
          />
        </div>
        <div className="vid-mgmt-input-group">
          <input
            type="number"
            placeholder="Season Number"
            value={videoData.seasonNumber}
            onChange={(e) =>
              setVideoData({ ...videoData, seasonNumber: e.target.value })
            }
            required
            className="vid-mgmt-input"
          />
        </div>
        <div className="vid-mgmt-input-group">
          <label className="vid-mgmt-checkbox-label">
            <input
              type="checkbox"
              className="vid-mgmt-checkbox"
              checked={videoData.isShort}
              onChange={(e) =>
                setVideoData({ ...videoData, isShort: e.target.checked })
              }
            />
            Is Short Video
          </label>
        </div>
        <button type="submit" className="vid-mgmt-submit">
          Add Video
        </button>
      </form>

      <div className="vid-mgmt-list">
        <h3 className="vid-mgmt-list-title">Manage Videos</h3>
        {videos.map((video) => (
          <div key={video._id} className="vid-mgmt-item">
            <div className="vid-mgmt-info">
              <h4 className="vid-mgmt-item-title">{video.title}</h4>
              <p className="vid-mgmt-item-season">Season {video.seasonNumber}</p>
            </div>
            <button 
              onClick={() => handleDelete(video._id)}
              className="vid-mgmt-delete-btn"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoManagement;