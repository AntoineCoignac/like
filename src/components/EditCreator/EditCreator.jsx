import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import newRequest from "../../utils/newRequest";
import upload from '../../utils/upload';
import { useNavigate } from 'react-router-dom';
import Download from '../../components/Download/Download';

function EditCreator() {
  const [suggestions, setSuggestions] = useState([]);
  const currentUserJson = localStorage.getItem('currentUser');
  const currentUser = currentUserJson && currentUserJson !== 'undefined' ? JSON.parse(currentUserJson) : null;
  const [searchQuery, setSearchQuery] = useState(currentUser.location ? currentUser.location : '');
  const [preview, setPreview] = useState(currentUser.img ? currentUser.img : "/img/pp/noavatar.jpg");
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const MAX_FILE_SIZE = 10000000;
  const [uploading, setUploading] = useState(false);
  
  const [updatedUser, setUpdatedUser] = useState({
    img : currentUser.img ? currentUser.img : null,
    name : currentUser.name ? currentUser.name : null,
    lastname : currentUser.lastname ? currentUser.lastname : null,
    desc : currentUser.desc ? currentUser.desc : null,
    location : currentUser.location ? currentUser.location : null,
    instagram : currentUser.instagram ? currentUser.instagram : null,
    tiktok : currentUser.tiktok ? currentUser.tiktok : null,
    twitter : currentUser.twitter ? currentUser.twitetr : null,
    youtube : currentUser.youtube ? currentUser.youtube : null,
    twitch : currentUser.twitch ? currentUser.twitch : null,
  });

  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    fetchSuggestions(value);
    handleChange(event);
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

  const handleChange = (e) => {
    setUpdatedUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeFile = (e) => {
    const newFile = e.target.files[0];
    if (newFile.size > MAX_FILE_SIZE) {
      setFileSizeExceeded(true);
      return;
    }
    setFile(newFile);
    const url = URL.createObjectURL(newFile);
    setPreview(url);
    setFileSizeExceeded(false);
  }

  const handleCitySelection = (city) => {
    setSearchQuery(city);
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload the image if it has changed
    let imageUrl = currentUser.img;
    if (file) {
      setUploading(true);
      imageUrl = await upload(file);
      setUploading(false);
    }

    try {
      await newRequest.put(`/users/${currentUser._id}`, {
        ...updatedUser,
        img: imageUrl,
      });

      localStorage.setItem('currentUser', JSON.stringify({
        ...currentUser,
        ...updatedUser,
        img: imageUrl,
      }));
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
          {
              uploading ? <Download /> : null
          }
          <div className="image-field">
            <img src={preview} alt="" />
            <input type="file" accept='.png, .jpg, .jpeg' onChange={handleChangeFile} />
            {fileSizeExceeded && (
                <p className='error'>
                    Votre fichier ne doit pas dépasser {MAX_FILE_SIZE / 1000000} MB
                </p>
            )}
          </div>
          <div className="field">
            <label htmlFor="name">Prénom</label>
            <input name='name' type="text" placeholder='ex : Jean' onChange={handleChange} defaultValue={currentUser.name}/>
          </div>
          <div className="field">
            <label htmlFor="lastname">Nom</label>
            <input name='lastname' type="text" placeholder='ex : Jean' onChange={handleChange} defaultValue={currentUser.lastname ? currentUser.lastname : ""}/>
          </div>
          <div className="field">
            <label htmlFor="desc">Bio</label>
            <input name='desc' type="text" placeholder='ex : Streamer depuis 5 ans' onChange={handleChange} defaultValue={currentUser.desc ? currentUser.desc : ""}/>
          </div>
          <div className="field">
            <label htmlFor="location">Localisation</label>
            <input name="location" type="text" placeholder='ex : Paris, France' value={searchQuery}
        onChange={handleLocationChange}/>
            <ul className='suggestions'>
              {suggestions.map((city, index) => (
                <li key={index} onClick={() => handleCitySelection(city)}>
                  {city}
                </li>
              ))}
            </ul>
          </div>
          <div className="field">
            <label htmlFor="instagram">Instagram</label>
            <input name='instagram' type="text" placeholder='ex : https://www.instagram.com/identifiant' onChange={handleChange} defaultValue={currentUser.instagram ? currentUser.instagram : ""}/>
          </div>
          <div className="field">
            <label htmlFor="tiktok">TikTok</label>
            <input name='tiktok' type="text" placeholder='ex : https://www.tiktok.com/@identifiant' onChange={handleChange} defaultValue={currentUser.tiktok ? currentUser.tiktok : ""}/>
          </div>
          <div className="field">
            <label htmlFor="twitter">Twitter</label>
            <input name='twitter' type="text" placeholder='ex : https://www.twitter.com/identifiant' onChange={handleChange} defaultValue={currentUser.twitter ? currentUser.twitter : ""}/>
          </div>
          <div className="field">
            <label htmlFor="youtube">YouTube</label>
            <input name='youtube' type="text" placeholder='ex : https://www.youtube.com/@identifiant' onChange={handleChange} defaultValue={currentUser.youtube ? currentUser.youtube : ""}/>
          </div>
          <div className="field">
            <label htmlFor="twitch">Twitch</label>
            <input name='twitch' type="text" placeholder='ex : https://www.twitch.tv/identifiant' onChange={handleChange} defaultValue={currentUser.twitch ? currentUser.twitch : ""}/>
          </div>
          <button className='btn' type="submit">Enregister les modifications</button>
        </form>
  )
}

export default EditCreator;