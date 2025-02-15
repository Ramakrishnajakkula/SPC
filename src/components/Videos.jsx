

// Videos.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Videos.css';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showSidebar] = useState(true);
  const videoRef = useRef(null);
  const mainContentRef = useRef(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const API_URL = 'https://spc-backend-two.vercel.app/api/videos';
    const MAX_RETRIES = 3;
    let retries = 0;

    const attemptFetch = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(API_URL, {
          timeout: 10000,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data) {
          setVideos(response.data);
          setLoading(false);
        } else {
          throw new Error('No data received from server');
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
        
        if (retries < MAX_RETRIES && err.code === 'ERR_NETWORK') {
          retries++;
          console.log(`Retrying... Attempt ${retries} of ${MAX_RETRIES}`);
          await new Promise(resolve => setTimeout(resolve, 1000 * retries));
          return attemptFetch();
        }

        let errorMessage = 'Failed to load videos. ';
        if (err.code === 'ERR_NETWORK') {
          errorMessage += 'Please check your internet connection.';
        } else if (err.response?.status === 404) {
          errorMessage += 'Videos not found.';
        } else {
          errorMessage += err.message;
        }
        
        setError(errorMessage);
        setVideos([]);
        setLoading(false);
      }
    };

    await attemptFetch();
  };

  const getYouTubeId = (url) => {
    const regex = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
    setTimeout(() => {
      if (mainContentRef.current) {
        mainContentRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        if (videoRef.current) {
          videoRef.current.focus();
        }
      }
    }, 100);
  };

  // const toggleSidebar = () => {
  //   setShowSidebar(!showSidebar);
  // };

  const getRecommendations = () => {
    if (!currentVideo) return [];
    return videos.filter(v => 
      v.seasonNumber === currentVideo.seasonNumber && 
      v._id !== currentVideo._id
    );
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
        <div className="vid-player-section">
          <div className="vid-main-content" ref={mainContentRef}>
            <div className="vid-featured-player">
              <div className="vid-featured-wrapper">
                <button 
                  className="vid-close-btn"
                  onClick={() => setCurrentVideo(null)}
                  aria-label="Close video"
                >×</button>
                <iframe
                  ref={videoRef}
                  src={`https://www.youtube.com/embed/${getYouTubeId(currentVideo.youtubeUrl)}?rel=0&modestbranding=1&autoplay=1`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="vid-featured-iframe"
                  tabIndex="0"
                ></iframe>
              </div>
              {/* <h2 className="vid-featured-title">{currentVideo.title}</h2> */}
            </div>
          </div>

          {showSidebar && (
            <div className="vid-sidebar">
              <div className="vid-sidebar-header">
                <h3>More from Season {currentVideo.seasonNumber}</h3>
                {/* <button onClick={toggleSidebar} className="vid-toggle-btn">
                  Hide
                </button> */}
              </div>
              <div className="vid-recommendations">
                {getRecommendations().map(video => (
                  <div 
                    key={video._id} 
                    className="vid-recommendation-card"
                    onClick={() => handleVideoSelect(video)}
                  >
                    <div className="vid-recommendation-thumbnail">
                      <img 
                        src={`https://img.youtube.com/vi/${getYouTubeId(video.youtubeUrl)}/mqdefault.jpg`}
                        alt={video.title}
                      />
                    </div>
                    <div className="vid-recommendation-info">
                      <h4>{video.title}</h4>
                      <p>Season {video.seasonNumber}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* {!showSidebar && (
            <button 
              onClick={toggleSidebar}
              className="vid-show-sidebar-btn"
            >
              Show More
            </button>
          )} */}
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

      <div className="vid-grid">
        {filteredVideos.map((video) => (
          <div key={video._id} className="vid-card">
            <h3 className="vid-title">{video.title}</h3>
            <div className="vid-wrapper" onClick={() => handleVideoSelect(video)}>
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