// Videos.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Videos.css';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('https://spc-backend-two.vercel.app/api/videos', {
        timeout: 5000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data) {
        setVideos(response.data);
      } else {
        throw new Error('No data received from server');
      }
      
    } catch (err) {
      console.error('Error fetching videos:', err);
      if (err.code === 'ERR_NETWORK') {
        setError('Unable to connect to server. Please check if backend is running.');
      } else if (err.response?.status === 404) {
        setError('Video endpoint not found. Please check API route.');
      } else {
        setError(`Failed to load videos: ${err.message}`);
      }
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeId = (url) => {
    const regex = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const filteredVideos = selectedSeason === 'all' 
    ? videos 
    : videos.filter(video => video.seasonNumber === parseInt(selectedSeason));

  if (loading) {
    return <div className="vid-loading">Loading videos...</div>;
  }

  if (error) {
    return <div className="vid-error">{error}</div>;
  }

  return (
    <div className="vid-container">
{currentVideo && (
  <div className="vid-featured-player">
    <div className="vid-featured-wrapper">
      <button 
        className="vid-close-btn"
        onClick={() => setCurrentVideo(null)}
        aria-label="Close video"
      >
        ×
      </button>
      <iframe
        src={`https://www.youtube.com/embed/${getYouTubeId(currentVideo.youtubeUrl)}?rel=0&modestbranding=1&autoplay=1`}
        title={currentVideo.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="vid-featured-iframe"
      ></iframe>
    </div>
    {/* <h2 className="vid-featured-title">{currentVideo.title}</h2> */}
  </div>
)}

      <div className="vid-season-filter">
        <select 
          value={selectedSeason} 
          onChange={(e) => setSelectedSeason(e.target.value)}
          className="vid-select"
        >
          <option value="all">All Seasons</option>
          {[...new Set(videos.map(v => v.seasonNumber))]
            .sort((a, b) => a - b)
            .map(season => (
              <option key={season} value={season}>Season {season}</option>
            ))}
        </select>
      </div>

      <div className="vid-grid width: 100%;">
        {filteredVideos.map((video) => (
          <div key={video._id} className="vid-card">
            <h3 className="vid-title">{video.title}</h3>
            <div className="vid-wrapper" onClick={() => setCurrentVideo(video)}>
              <div className="vid-thumbnail">
                <img 
                  src={`https://img.youtube.com/vi/${getYouTubeId(video.youtubeUrl)}/mqdefault.jpg`}
                  alt={video.title}
                />
                <div className="vid-play-button">▶</div>
              </div>
            </div>
            <p className="vid-season">Season {video.seasonNumber}</p>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && !loading && (
        <div className="vid-no-videos">
          No videos found for the selected season.
        </div>
      )}
    </div>
  );
};

export default Videos;