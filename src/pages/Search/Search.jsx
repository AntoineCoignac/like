import React, { useState } from 'react';
import Back from '../../components/Back/Back';
import "./Search.css";
import Cross from '../../icons/cross/Cross';
import NavSearch from '../../components/NavSearch/NavSearch';

function Search() {

  const [isSearching, setIsSearching] = useState(false);
  const [type, setType] = useState("gig");

  const handleInput = (e) => {
    const inputValue = e.target.value;
    setIsSearching(inputValue !== '');
  }

  const handleDelete = () => {
    const inputElement = document.getElementsByClassName("searchbar")[0];
    inputElement.value = "";
    setIsSearching(false);
  }
  

  return (
    <div className="search">
      <div className="top-bar">
        <Back/>
        <div className='searchbar-ctn'>
          <input onInput={handleInput} className='searchbar' type="text" placeholder='Rechercher'/>
          <button onClick={handleDelete} className={`delete ${isSearching ? "active" : ""}`}>
            <Cross/>
          </button>
        </div>
      </div>
      <NavSearch setType={setType} activeType={type} />
      {
        type==="gig" ? (
          <span>yo</span>
        ) : (
          <span>lol</span>
        )
      }
    </div>
  )
}

export default Search