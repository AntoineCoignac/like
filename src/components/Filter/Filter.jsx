import React, { useState } from 'react';
import SettingsIcon from '../../icons/settings/SettingsIcon';
import "./Filter.scss";
import FilterSettings from '../FilterSettings/FilterSettings';
import { useRef } from 'react';
import BackArrow from '../../icons/back/BackArrow';
import { useEffect } from 'react';

function Filter({ filters, setFilters }) {
  const [activeSettings, setActiveSettings] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollStartX, setScrollStartX] = useState(0);
  const scrollContainerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

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

  const scrollLeft = () => {
    smoothScroll(-200); // Appelle la fonction pour un défilement fluide vers la gauche
  };

  const scrollRight = () => {
    smoothScroll(200); // Appelle la fonction pour un défilement fluide vers la droite
  };

  const smoothScroll = (offset) => {
    const container = scrollContainerRef.current;
    const startX = container.scrollLeft;
    const startTime = performance.now();

    const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const scroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const scrollAmount = easeInOutQuad(elapsedTime / 300) * offset;

      container.scrollLeft = startX + scrollAmount;

      if (elapsedTime < 300) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    // Vérifie si le scroll est à gauche (0 pixels)
    const atStart = container.scrollLeft === 0;
    setIsAtStart(atStart);

    // Vérifie si le scroll est à la fin (dernière position - largeur visible)
    console.log(container.scrollWidth - container.clientWidth, container.scrollLeft)
    const atEnd = container.scrollLeft + 1 >= (container.scrollWidth - container.clientWidth);
    setIsAtEnd(atEnd);
  };

  useEffect(() => {
    // Ajoute un écouteur d'événement de scroll à la liste de filtres
    const container = scrollContainerRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => {
      // Nettoie l'écouteur d'événement lors du démontage du composant
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="filters">
      <button className="border-icon-btn" type='button' onClick={() => setActiveSettings(!activeSettings)}>
        <SettingsIcon />
      </button>
      <button className="scroll-button left" onClick={scrollLeft} disabled={isAtStart}><BackArrow/></button>
      <button className="scroll-button right" onClick={scrollRight} disabled={isAtEnd}><BackArrow/></button>
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
          className={`filter ${filters.tag === "monteur vidéo" ? "active" : ""}`}
          id="monteur vidéo"
        >
          Monteur vidéo
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "vidéaste" ? "active" : ""}`}
          id="vidéaste"
        >
          Vidéaste
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "youtuber" ? "active" : ""}`}
          id="youtuber"
        >
          Youtuber
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "streamer" ? "active" : ""}`}
          id="streamer"
        >
          Streamer
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "motion designer" ? "active" : ""}`}
          id="motion designer"
        >
          Motion Designer
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "podcaster" ? "active" : ""}`}
          id="podcaster"
        >
          Podcaster
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "rédacteur web" ? "active" : ""}`}
          id="rédacteur web"
        >
          Rédacteur Web
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "développeur web" ? "active" : ""}`}
          id="développeur web"
        >
          Développeur Web
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "blogger" ? "active" : ""}`}
          id="blogger"
        >
          Blogger
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "copywriter" ? "active" : ""}`}
          id="copywriter"
        >
          Copywriter
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "ghostwriter" ? "active" : ""}`}
          id="ghostwriter"
        >
          Ghostwriter
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "traducteur" ? "active" : ""}`}
          id="traducteur"
        >
          Traducteur
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "photographe" ? "active" : ""}`}
          id="photographe"
        >
          Photographe
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "graphiste" ? "active" : ""}`}
          id="graphiste"
        >
          Graphiste
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "illustrateur" ? "active" : ""}`}
          id="illustrateur"
        >
          Illustrateur
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "ux/ui designer" ? "active" : ""}`}
          id="ux/ui designer"
        >
          UX/UI Designer
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "influenceur" ? "active" : ""}`}
          id="influenceur"
        >
          Influenceur
        </button>
        <button
          onClick={handleClick}
          className={`filter ${filters.tag === "créateur ugc" ? "active" : ""}`}
          id="créateur ugc"
        >
          Créateur UGC
        </button>
      </div>
      <FilterSettings active={activeSettings ? "active" : ""} filters={filters} setFilters={setFilters} />
    </div>
  )
}

export default Filter;
