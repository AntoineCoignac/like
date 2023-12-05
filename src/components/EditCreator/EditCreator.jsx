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
  const [previewContract, setPreviewContract] = useState(currentUser.contract ? currentUser.contract : null);
  const [ppSizeExceeded, setPPSizeExceeded] = useState(false);
  const [contractSizeExceeded, setContractSizeExceeded] = useState(false);
  const MAX_FILE_SIZE = 10000000;
  const [uploading, setUploading] = useState(false);
  
  const [updatedUser, setUpdatedUser] = useState({
    img : currentUser.img ? currentUser.img : null,
    name : currentUser.name ? currentUser.name : null,
    lastname : currentUser.lastname ? currentUser.lastname : null,
    desc : currentUser.desc ? currentUser.desc : null,
    location : currentUser.location ? currentUser.location : null,
    contract : currentUser.contract ? currentUser.contract : null
    /*instagram : currentUser.instagram ? currentUser.instagram : null,
    tiktok : currentUser.tiktok ? currentUser.tiktok : null,
    twitter : currentUser.twitter ? currentUser.twitter : null,
    youtube : currentUser.youtube ? currentUser.youtube : null,
    twitch : currentUser.twitch ? currentUser.twitch : null,
    linkedin : currentUser.linkedin ? currentUser.linkedin : null,*/
  });

  const [pp, setPP] = useState(null);
  const [contract, setContract] = useState(null);
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

  const handleChangePP = (e) => {
    const newPP = e.target.files[0];
    if (newPP && newPP.size > MAX_FILE_SIZE) {
      setPPSizeExceeded(true);
      return;
    }
    setPP(newPP);
    const url = URL.createObjectURL(newPP);
    console.log(url);
    setPreview(url);
    setPPSizeExceeded(false);
  }

  const handleChangeContract = (e) => {
    const newContract = e.target.files[0];
    if (newContract && newContract.size > MAX_FILE_SIZE) {
      setContractSizeExceeded(true);
      return;
    }
    setContract(newContract);
    const url = URL.createObjectURL(newContract);
    setPreviewContract(url);
    setContractSizeExceeded(false);
  }

  const handleCitySelection = (city) => {
    setSearchQuery(city);
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload the image if it has changed
    let imageUrl = currentUser.img;
    if (pp) {
      setUploading(true);
      imageUrl = await upload(pp);
      console.log(imageUrl);
    }

    // Upload the image if it has changed
    let contractUrl = currentUser.contract;
    if (contract) {
      setUploading(true);
      contractUrl = await upload(contract);
      console.log(contractUrl);
    }

    try {
      await newRequest.put(`/users/${currentUser._id}`, {
        ...updatedUser,
        img: imageUrl,
        contract: contractUrl
      });

      localStorage.setItem('currentUser', JSON.stringify({
        ...currentUser,
        ...updatedUser,
        img: imageUrl,
        contract: contractUrl
      }));
      setUploading(false);
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
            <input type="file" accept='.png, .jpg, .jpeg' onChange={handleChangePP} />
            {ppSizeExceeded && (
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
            <label htmlFor="lastname">Contrat</label>
            {
              previewContract ? 
                <iframe className='preview-pdf' src={previewContract} width="100%" height="600px"></iframe>
              : null
            }
            <input type="file" accept='.pdf' onChange={handleChangeContract} />
            {contractSizeExceeded && (
                <p className='error'>
                    Votre fichier ne doit pas dépasser {MAX_FILE_SIZE / 1000000} MB
                </p>
            )}
          </div>
          {/*
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
          <div className="field">
            <label htmlFor="linkedin">LinkedIn</label>
            <input name='linkedin' type="text" placeholder='ex : https://www.linkedin.com/in/identifiant' onChange={handleChange} defaultValue={currentUser.linkedin ? currentUser.linkedin : ""}/>
              </div>*/}
          <button className='btn' type="submit">Enregister les modifications</button>
        </form>
  )
}

export default EditCreator;