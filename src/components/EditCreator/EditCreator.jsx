import React from 'react';
import axios from 'axios';
import { useState } from 'react';

function EditCreator() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    fetchSuggestions(value);
  };

  const fetchSuggestions = (query) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1`;

    axios.get(url)
      .then(response => {
        const cities = response.data.map(item => item.display_name);
        setSuggestions(cities);
      })
      .catch(error => {
        console.error('Error when searching for cities :', error);
      });
  };

  const handleCitySelection = (city) => {
    setSearchQuery(city);
    setSuggestions([]);
  };

  return (
    <form className='form' action="">
          <div className="image-field">
            <img src="/img/pp/noavatar.jpg" alt="" />
            <input type="file" name="" id="" />
          </div>
          <div className="field">
            <label htmlFor="name">Prénom</label>
            <input name='name' type="text" placeholder='ex : Jean' />
          </div>
          <div className="field">
            <label htmlFor="name">Nom</label>
            <input name='name' type="text" placeholder='ex : Jean' />
          </div>
          <div className="field">
            <label htmlFor="desc">Bio</label>
            <input name='desc' type="text" placeholder='ex : Streamer depuis 5 ans' />
          </div>
          <div className="field">
            <label htmlFor="location">Localisation</label>
            <input name="location" type="text" placeholder='ex : Paris, France' value={searchQuery}
        onChange={handleInputChange}/>
            <ul className='suggestions'>
              {suggestions.map((city, index) => (
                <li key={index} onClick={() => handleCitySelection(city)}>
                  {city}
                </li>
              ))}
            </ul>
          </div>
          <div className="field">
            <label htmlFor="">Instagram</label>
            <input type="text" placeholder='ex : https://www.instagram.com/identifiant' />
          </div>
          <div className="field">
            <label htmlFor="">TikTok</label>
            <input type="text" placeholder='ex : https://www.tiktok.com/@identifiant' />
          </div>
          <div className="field">
            <label htmlFor="">Twitter</label>
            <input type="text" placeholder='ex : https://www.twitter.com/identifiant' />
          </div>
          <div className="field">
            <label htmlFor="">YouTube</label>
            <input type="text" placeholder='ex : https://www.youtube.com/@identifiant' />
          </div>
          <div className="field">
            <label htmlFor="">Twitch</label>
            <input type="text" placeholder='ex : https://www.twitch.tv/identifiant' />
          </div>
          <button className='btn' type="submit">Enregister les modifications</button>
        </form>
  )
}

export default EditCreator;