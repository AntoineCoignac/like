import React, { useState } from 'react';
import SettingsIcon from '../../icons/settings/SettingsIcon';
import "./Filter.css";
import FilterSettings from '../FilterSettings/FilterSettings';

function Filter({ filters, setFilters }) {
  const [activeSettings, setActiveSettings] = useState(false);

  const handleClick = (event) => {
    const button = event.target;
    const filterId = button.id;
    setFilters((prev) => ({
      ...prev,
      tag: filterId,
    }));
  }

  return (
    <div className="filters">
      <button className="border-icon-btn" type='button' onClick={() => setActiveSettings(!activeSettings)}>
        <SettingsIcon />
      </button>
      <div className="filters-list">
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "me" ? "active" : ""}`}
          id="me"
        >
          Tous
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "influence" ? "active" : ""}`}
          id="influence"
        >
          Influence
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "streaming" ? "active" : ""}`}
          id="streaming"
        >
          Streaming
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "vidéo" ? "active" : ""}`}
          id="vidéo"
        >
          Vidéo
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "musique" ? "active" : ""}`}
          id="musique"
        >
          Musique
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "photo" ? "active" : ""}`}
          id="photo"
        >
          Photo
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "podcast" ? "active" : ""}`}
          id="podcast"
        >
          Podcast
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "ugc" ? "active" : ""}`}
          id="ugc"
        >
          UGC
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "montage vidéo" ? "active" : ""}`}
          id="montage vidéo"
        >
          Montage vidéo
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "blog" ? "active" : ""}`}
          id="blog"
        >
          Blog
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "design graphique" ? "active" : ""}`}
          id="design graphique"
        >
          Design graphique
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "animation 2d/3d" ? "active" : ""}`}
          id="animation 2d/3d"
        >
          Animation 2d/3d
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "ui/ux" ? "active" : ""}`}
          id="ui/ux"
        >
          UI/UX
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "développement web" ? "active" : ""}`}
          id="développement web"
        >
          Développement web
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "rédaction" ? "active" : ""}`}
          id="rédaction"
        >
          rédaction
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "voix off" ? "active" : ""}`}
          id="voix off"
        >
          Voix off
        </button>
      </div>
      <FilterSettings active={activeSettings ? "active" : ""} />
    </div>
  )
}

export default Filter;
