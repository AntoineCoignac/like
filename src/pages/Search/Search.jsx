import React, { useState } from 'react';
import Back from '../../components/Back/Back';
import "./Search.css";
import Cross from '../../icons/cross/Cross';

function Search() {

  const [isSearching, setIsSearching] = useState(false);

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
    </div>
  )
}

export default Search