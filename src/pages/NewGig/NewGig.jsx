import React, { useState } from 'react';
import Back from '../../components/Back/Back';
import "./NewGig.scss";
import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import upload from '../../utils/upload';
import Download from '../../components/Download/Download';

function NewGig() {
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [gig, setGig] = useState({
    title: "",
    desc: "",
    price: 199,
    deliveryTime: 3,
    revisionNumber: 3,
    cover: ""
  });
  const [preview, setPreview] = useState("");
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const MAX_IMAGE_SIZE = 10000000; // 10 MB
  const MAX_VIDEO_SIZE = 100000000; // 100 MB
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGig((prevGig) => ({
      ...prevGig,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      if (isImage(newFile) && newFile.size > MAX_IMAGE_SIZE) {
        setFileSizeExceeded(true);
        return;
      }
      if (isVideo(newFile) && newFile.size > MAX_VIDEO_SIZE) {
        setFileSizeExceeded(true);
        return;
      }

      setFileSizeExceeded(false);
      setFile(newFile);
      const url = URL.createObjectURL(newFile);
      setPreview(url);
    }
  };

  const isImage = (file) => {
    return file.type.startsWith('image/');
  };

  const isVideo = (file) => {
    return file.type.startsWith('video/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      gig.title.trim() !== "" &&
      gig.desc.trim() !== "" &&
      Number(gig.price) > 0 &&
      Number(gig.deliveryTime) > 0 &&
      Number(gig.revisionNumber) >= 0 &&
      file
    ) {
      try {
        setUploading(true);
        const url = await upload(file);
        setUploading(false);
        await newRequest.post("/gigs", {
          ...gig,
          cover: url,
        });
        navigate("/");
      } catch (err) {
        // Handle server errors and display a user-friendly error message
        if (err.response && err.response.data) {
          setError(err.response.data);
        } else {
          setError("Une erreur s'est produite.");
        }
      }
    } else {
      setError("Tous les champs sont requis !");
    }
  };

  return (
    <>
      {
          uploading ? <Download /> : null
      }
      <div className="top-bar">
        <Back />
        <p className="name big-title">Nouvelle presta</p>
      </div>
      <div className="newgig">
        <form className='form' onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="title">Nom de la presta</label>
            <input maxLength={100} name='title' type="text" placeholder='ex : Pack 5 photos de votre choix' onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="desc">Description</label>
            <textarea maxLength={1000} name='desc' placeholder="ex : Je vais prendre 5 photos de votre produit, un endroit, une personne, ou ce que vous voulez..." onChange={handleChange} required/>
          </div>
          <div className="field">
            <label htmlFor="price">Prix (€)</label>
            <input name='price' min="10" max="1000000000" step={0.01} defaultValue={gig.price} type="number" onChange={handleChange} required />
          </div>
          <div className="field-grid">
          <div className="field">
            <label htmlFor="deliveryTime">Temps de livraison (jours)</label>
            <input name='deliveryTime' min="1" step={1} max="365" defaultValue={gig.deliveryTime} type="number" onChange={handleChange} required/>
          </div>
          <div className="field">
            <label htmlFor="revisionNumber">Nombre de modifications maximum</label>
            <input name='revisionNumber' min="0" step={1} max="10" defaultValue={gig.revisionNumber} type="number" onChange={handleChange} required/>
          </div>
          </div>
          <div className="field">
            <label>Couverture</label>
            {preview !== undefined && preview !== "" ? (
              <div className="preview">
                {file !== null ? (
                  isVideo(file) ? (
                    <video loading='lazy' key={Date.now()} controls>
                      <source src={URL.createObjectURL(file)} />
                    </video>
                  ) : (
                    <img loading='lazy' src={URL.createObjectURL(file)} alt="" />
                  )
                ) : null}
              </div>
            ) : null}
            <input
              name="file"
              type="file"
              accept='.png, .jpg, .jpeg, video/mp4'
              onChange={handleFileChange}
              required
            />
            {fileSizeExceeded && (
              <p className="error">Le fichier est trop volumineux.</p>
            )}
          </div>
          <button className='btn' type="submit">➕ Créer</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </>
  )
}

export default NewGig;
