import React, { useState } from 'react';
import SettingsIcon from '../../icons/settings/SettingsIcon';
import "./Filter.css";
import FilterSettings from '../FilterSettings/FilterSettings';
import { useRef } from 'react';

function Filter({ filters, setFilters }) {
  const [activeSettings, setActiveSettings] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollStartX, setScrollStartX] = useState(0);
  const scrollContainerRef = useRef(null);

  const handleClick = (event) => {
    const button = event.target;
    const filterId = button.id;
    setFilters((prev) => ({
      ...prev,
      tag: filterId,
    }));
  }

  const handleMouseDown = (event) => {
    setIsScrolling(true);
    setScrollStartX(event.clientX);
  };

  const handleMouseMove = (event) => {
    if (!isScrolling) return;

    const offsetX = event.clientX - scrollStartX;
    scrollContainerRef.current.scrollLeft -= offsetX;
    setScrollStartX(event.clientX);
  };

  const handleMouseUp = () => {
    setIsScrolling(false);
  };

  return (
    <div className="filters">
      <button className="border-icon-btn" type='button' onClick={() => setActiveSettings(!activeSettings)}>
        <SettingsIcon />
      </button>
      <div className="filters-list" ref={scrollContainerRef} onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
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
          Rédaction
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "voix off" ? "active" : ""}`}
          id="voix off"
        >
          Voix off
        </button>
      </div>
      <FilterSettings active={activeSettings ? "active" : ""} filters={filters} setFilters={setFilters} />
    </div>
  )
}

export default Filter;
