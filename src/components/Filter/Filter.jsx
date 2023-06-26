import React, { useState } from 'react';
import SettingsIcon from '../../icons/settings/SettingsIcon';
import "./Filter.css";
import FilterSettings from '../FilterSettings/FilterSettings';

function Filter() {

  const [activeSettings, setActiveSettings] = useState(false);

  const handleClick = (event) => {
    const button = event.target;
    button.classList.toggle("active");
  }

  return (
    <div className="filters">
      <button className="border-icon-btn" type='button' onClick={()=>setActiveSettings(!activeSettings)}>
        <SettingsIcon/>
      </button>
      <div className="filters-list">
        <button onClick={handleClick} className="filter" id="me">pour moi</button>
        <button onClick={handleClick} className="filter" id="influencer">influenceur</button>
        <button onClick={handleClick} className="filter" id="streamer">streamer</button>
        <button onClick={handleClick} className="filter" id="ugc">créateur ugc</button>
        <button onClick={handleClick} className="filter" id="photographer">photographe</button>
        <button onClick={handleClick} className="filter" id="video editor">monteur vidéo</button>
        <button onClick={handleClick} className="filter" id="blogger">blogueur</button>
      </div>
      <FilterSettings active={activeSettings ? "active" : ""}/>
    </div>
  )
}

export default Filter;