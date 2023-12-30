import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
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
  const [mediaFiles, setMediaFiles] = useState([currentUser.medias[0], currentUser.medias[1], currentUser.medias[2], currentUser.medias[3]]);
  const [mediaPreviews, setMediaPreviews] = useState([currentUser.medias[0], currentUser.medias[1], currentUser.medias[2], currentUser.medias[3]]);
  const MAX_MEDIA_SIZE = 100000000;
  const [mediaSizeExceeded, setMediaSizeExceeded] = useState(Array(4).fill(false)); // État pour gérer les tailles excessives des fichiers media

  
  const [updatedUser, setUpdatedUser] = useState({
    img : currentUser.img ? currentUser.img : null,
    name : currentUser.name ? currentUser.name : null,
    lastname : currentUser.lastname ? currentUser.lastname : null,
    desc : currentUser.desc ? currentUser.desc : null,
    tag : currentUser.tag ? currentUser.tag : null,
    location : currentUser.location ? currentUser.location : null,
    contract : currentUser.contract ? currentUser.contract : null,
    medias : currentUser.medias ? currentUser.medias : null
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

  const handleMediaChange = (index, e) => {
    const newMedia = e.target.files[0];
  
    // Vérification pour les images
    if (newMedia && newMedia.type.startsWith('image')) {
      if (newMedia.size > MAX_FILE_SIZE) { // Limite pour les images à 10 MB
        setMediaSizeExceeded(prevState => {
          const newState = [...prevState];
          newState[index] = true;
          return newState;
        });
        return;
      }
    } else { // Pour les autres types de médias (vidéos, etc.)
      if (newMedia && newMedia.size > MAX_MEDIA_SIZE) { // Limite pour les autres médias à 100 MB
        setMediaSizeExceeded(prevState => {
          const newState = [...prevState];
          newState[index] = true;
          return newState;
        });
        return;
      }
    }
  
    // Réinitialiser l'état s'il n'y a pas d'erreur de taille de fichier
    setMediaSizeExceeded(prevState => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  
    setMediaFiles(prevMediaFiles => {
      const updatedMediaFiles = [...prevMediaFiles];
      updatedMediaFiles[index] = newMedia;
      return updatedMediaFiles;
    });
  
    if (newMedia) {
      const url = URL.createObjectURL(newMedia);
      setMediaPreviews(prevMediaPreviews => {
        const updatedMediaPreviews = [...prevMediaPreviews];
        updatedMediaPreviews[index] = url;
        return updatedMediaPreviews;
      });
    }
  };

  const handleCitySelection = (city) => {
    setSearchQuery(city);
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let imageUrl = currentUser.img;
      let contractUrl = currentUser.contract;
  
      // Upload the image if it has changed
      if (pp) {
        setUploading(true);
        imageUrl = await upload(pp);
      }
  
      // Upload the contract if it has changed
      if (contract) {
        setUploading(true);
        contractUrl = await upload(contract);
      }
  
      const uploadedMediaUrls = [];
  
      const uploadMediaSequentially = async () => {
        for (let i = 0; i < mediaFiles.length; i++) {
          const media = mediaFiles[i];
          if (media) {
            try {
              setUploading(true);
              const uploadedMedia = await upload(media);
              uploadedMediaUrls.push(uploadedMedia);
            } catch (error) {
              console.log(`Error uploading Media ${i + 1}:`, error);
              uploadedMediaUrls.push(null);
            }
          } else {
            uploadedMediaUrls.push(null);
          }
        }
      };
  
      await uploadMediaSequentially();
  
      await newRequest.put(`/users/${currentUser._id}`, {
        ...updatedUser,
        img: imageUrl,
        contract: contractUrl,
        medias: uploadedMediaUrls,
      });
  
      localStorage.setItem('currentUser', JSON.stringify({
        ...currentUser,
        ...updatedUser,
        img: imageUrl,
        contract: contractUrl,
        medias: uploadedMediaUrls,
      }));
  
      setUploading(false);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const mediaURLs = currentUser.medias || [];
    const updatedMediaPreviews = mediaURLs.map(mediaURL => (
      mediaURL ? mediaURL : null
    ));
    setMediaPreviews(prevPreviews => (
      prevPreviews.every(prev => prev === null) ? updatedMediaPreviews : prevPreviews
    ));
  }, []);

  return (
    <form className='form secondary' onSubmit={handleSubmit}>
          {
              uploading ? <Download /> : null
          }
          <div className="image-field">
            <img src={preview} alt="" />
            <input type="file" accept='.png, .jpg, .jpeg' onChange={handleChangePP} />
            {ppSizeExceeded && (
                <p className='error'>
                    Votre fichier ne doit pas dépasser {MAX_FILE_SIZE / 10000000} MB
                </p>
            )}
          </div>
          <div className="field-grid">
          <div className="field">
            <label htmlFor="name">Prénom</label>
            <input maxLength={100} name='name' type="text" placeholder='ex : Jean' onChange={handleChange} defaultValue={currentUser.name}/>
          </div>
          <div className="field">
            <label htmlFor="lastname">Nom</label>
            <input maxLength={100} name='lastname' type="text" placeholder='ex : Jean' onChange={handleChange} defaultValue={currentUser.lastname ? currentUser.lastname : ""}/>
          </div>
          </div>
          <div className="field">
            <label htmlFor="desc">Bio</label>
            <textarea name='desc' maxLength={300} placeholder='ex : Streamer depuis 5 ans' onChange={handleChange} defaultValue={currentUser.desc ? currentUser.desc : ""}/>
          </div>
          <div className="field-grid">
          <div className="field">
            <label htmlFor="tag">Tag</label>
            <select defaultValue={currentUser.tag ? currentUser.tag : ""} name="tag" onChange={handleChange}>
              <option value="monteur vidéo">Monteur Vidéo</option>
              <option value="vidéaste">Vidéaste</option>
              <option value="youtuber">Youtuber</option>
              <option value="streamer">Streamer</option>
              <option value="motion designer">Motion Designer</option>
              <option value="podcaster">Podcaster</option>
              <option value="rédacteur web">Rédacteur Web</option>
              <option value="développeur web">Développeur Web</option>
              <option value="blogger">Blogger</option>
              <option value="copywriter">Copywriter</option>
              <option value="ghostwriter">Ghostwriter</option>
              <option value="traducteur">Traducteur</option>
              <option value="photographe">Photographe</option>
              <option value="graphiste">Graphiste</option>
              <option value="illustrateur">Illustrateur</option>
              <option value="ux/ui designer">UX/UI Designer</option>
              <option value="influenceur">Influenceur</option>
              <option value="créateur ugc">Créateur UGC</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="location">Localisation</label>
            <input maxLength={100} name="location" type="text" placeholder='ex : Paris, France' value={searchQuery}
        onChange={handleLocationChange}/>
            <ul className='suggestions'>
              {suggestions.map((city, index) => (
                <li key={index} onClick={() => handleCitySelection(city)}>
                  {city}
                </li>
              ))}
            </ul>
          </div>
          </div>
          <div className="field-grid">
          {mediaFiles.map((media, index) => (
            <div key={index} className="field">
              <label htmlFor={`media-${index + 1}`}>{`Média ${index + 1}`}</label>
              {mediaPreviews[index] && (
                mediaPreviews[index].includes('video') ? (
                  <video className='preview-media' src={mediaPreviews[index]} alt={`Preview Media ${index + 1}`} controls />
                ) : (
                  mediaPreviews[index].includes('image') ? <img className='preview-media' src={mediaPreviews[index]} alt={`Preview Media ${index + 1}`} /> : null
                )
              )}
              <input type="file" accept=".png, .jpg, .jpeg, .mp4, .avi" onChange={(e) => handleMediaChange(index, e)} />
              {mediaSizeExceeded[index] && (
                <p className='error'>
                  Votre fichier média ne doit pas dépasser {MAX_MEDIA_SIZE / 1000000} MB pour les vidéos et {MAX_FILE_SIZE / 1000000} MB pour les photos.
                </p>
              )}
            </div>
          ))}
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
          <button className='btn' type="submit">💾 Enregister les modifications</button>
        </form>
  )
}

export default EditCreator;