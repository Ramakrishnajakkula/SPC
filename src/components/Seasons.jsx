// CreateSeason.jsx
import { useState } from 'react';
import './Season.css';

function CreateSeason() {
  const [seasonData, setSeasonData] = useState({
    title: '',
    description: '',
    guests: [],
    coverImage: null
  });

  const [shorts, setShorts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [newShort, setNewShort] = useState({ title: '', link: '', description: '' });
  const [newVideo, setNewVideo] = useState({ title: '', link: '', description: '' });

  const handleSeasonChange = (e) => {
    setSeasonData({ ...seasonData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSeasonData({ ...seasonData, coverImage: file });
  };

  const addShort = (e) => {
    e.preventDefault();
    setShorts([...shorts, newShort]);
    setNewShort({ title: '', link: '', description: '' });
  };

  const addVideo = (e) => {
    e.preventDefault();
    setVideos([...videos, newVideo]);
    setNewVideo({ title: '', link: '', description: '' });
  };

  return (
    <div className="create-season-container">
      <section className="season-info">
        <h1>Create New Season</h1>
        
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Season Title"
            value={seasonData.title}
            onChange={handleSeasonChange}
          />
          
          <textarea
            name="description"
            placeholder="Season Description"
            value={seasonData.description}
            onChange={handleSeasonChange}
          />
          
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
          />
        </div>
      </section>

      <section className="shorts-section">
        <h2>Shorts</h2>
        <form onSubmit={addShort}>
          <input
            type="text"
            placeholder="Short Title"
            value={newShort.title}
            onChange={(e) => setNewShort({...newShort, title: e.target.value})}
          />
          <input
            type="url"
            placeholder="Short Link"
            value={newShort.link}
            onChange={(e) => setNewShort({...newShort, link: e.target.value})}
          />
          <textarea
            placeholder="Short Description"
            value={newShort.description}
            onChange={(e) => setNewShort({...newShort, description: e.target.value})}
          />
          <button type="submit">Add Short</button>
        </form>
        
        <div className="shorts-grid">
          {shorts.map((short, index) => (
            <div key={index} className="short-card">
              <h3>{short.title}</h3>
              <p>{short.description}</p>
              <a href={short.link} target="_blank" rel="noopener noreferrer">Watch</a>
            </div>
          ))}
        </div>
      </section>

      <section className="videos-section">
        <h2>Videos</h2>
        <form onSubmit={addVideo}>
          <input
            type="text"
            placeholder="Video Title"
            value={newVideo.title}
            onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
          />
          <input
            type="url"
            placeholder="Video Link"
            value={newVideo.link}
            onChange={(e) => setNewVideo({...newVideo, link: e.target.value})}
          />
          <textarea
            placeholder="Video Description"
            value={newVideo.description}
            onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
          />
          <button type="submit">Add Video</button>
        </form>

        <div className="videos-grid">
          {videos.map((video, index) => (
            <div key={index} className="video-card">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <a href={video.link} target="_blank" rel="noopener noreferrer">Watch</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CreateSeason;