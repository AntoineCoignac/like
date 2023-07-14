import React, { useState } from 'react';
import SettingsIcon from '../../icons/settings/SettingsIcon';
import "./Filter.css";
import FilterSettings from '../FilterSettings/FilterSettings';

function Filter() {
  const [activeSettings, setActiveSettings] = useState(false);
  const [activeFilter, setActiveFilter] = useState("me"); // Filtre par défaut sélectionné

  const handleClick = (event) => {
    const button = event.target;
    const filterId = button.id;
    setActiveFilter(filterId);
  }

  return (
    <div className="filters">
      <button className="border-icon-btn" type='button' onClick={() => setActiveSettings(!activeSettings)}>
        <SettingsIcon/>
      </button>
      <div className="filters-list">
        <button
          onClick={handleClick}
          className={`filter ${activeFilter === "me" ? "active" : ""}`}
          id="me"
        >
          pour moi
        </button>
        <button
          onClick={handleClick}
          className={`filter ${activeFilter === "influencer" ? "active" : ""}`}
          id="influencer"
        >
          influenceur
        </button>
        <button
          onClick={handleClick}
          className={`filter ${activeFilter === "streamer" ? "active" : ""}`}
          id="streamer"
        >
          streamer
        </button>
        <button
          onClick={handleClick}
          className={`filter ${activeFilter === "ugc" ? "active" : ""}`}
          id="ugc"
        >
          créateur ugc
        </button>
        <button
          onClick={handleClick}
          className={`filter ${activeFilter === "photographer" ? "active" : ""}`}
          id="photographer"
        >
          photographe
        </button>
        <button
          onClick={handleClick}
          className={`filter ${activeFilter === "video editor" ? "active" : ""}`}
          id="video editor"
        >
          monteur vidéo
        </button>
        <button
          onClick={handleClick}
          className={`filter ${activeFilter === "blogger" ? "active" : ""}`}
          id="blogger"
        >
          blogueur
        </button>
      </div>
      <FilterSettings active={activeSettings ? "active" : ""}/>
    </div>
  )
}

export default Filter;
