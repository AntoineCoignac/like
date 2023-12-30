import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Back from '../../components/Back/Back';
import "./EditGig.scss";
import newRequest from '../../utils/newRequest';
import upload from '../../utils/upload';
import Download from '../../components/Download/Download';

function EditGig() {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const MAX_IMAGE_SIZE = 10000000;
  const MAX_VIDEO_SIZE = 100000000;

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
  const [preview, setPreview] = useState();
  const [uploading, setUploading] = useState(false);

  const isImage = (file) => {
    return file && file.type && file.type.startsWith('image/');
  };

  const isVideo = (file) => {
    return file && file.type && file.type.startsWith('video/');
  };

  useEffect(() => {
    async function fetchGig() {
      try {
        const response = await newRequest.get(`/gigs/single/${gigId}`);
        const fetchedGig = response.data;
        setGig(fetchedGig);
        setPreview(fetchedGig.cover);
      } catch (err) {
        console.error(err);
        navigate(-1);
      }
    }
    fetchGig();
  }, [gigId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      gig.title.trim() !== "" &&
      gig.desc.trim() !== "" &&
      Number(gig.price) > 0 &&
      Number(gig.deliveryTime) > 0 &&
      Number(gig.revisionNumber) > 0
    ) {
      try {
        let updatedUrl = gig.cover;
        if (file) {
          setUploading(true);
          updatedUrl = await upload(file);
          setUploading(false);
        }

        await newRequest.put(`/gigs/${gigId}`, {
          ...gig,
          cover: updatedUrl,
        });
        navigate(`/work/dashboard`);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Une erreur s'est produite.");
        }
      }
    } else {
      setError("Tous les champs sont requis !");
    }
  };

  const handleDelete = async () => {
    try {
      await newRequest.delete(`/gigs/${gigId}`);
      navigate(`/work/dashboard`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    {
      uploading ? <Download /> : null
    }
      <div className="top-bar">
        <Back />
        <p className="name big-title">Modifier ma presta</p>
      </div>
      <div className="newgig">
        <form className='form' onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="title">Nom de la presta</label>
            <input maxLength={100} name='title' type="text" value={gig.title} placeholder='ex : Pack 5 photos de votre choix' onChange={handleChange} required/>
          </div>
          <div className="field">
            <label htmlFor="desc">Description</label>
            <textarea name='desc' maxLength={300} value={gig.desc} placeholder="ex : Je vais prendre 5 photos de votre produit, un endroit, une personne, ou ce que vous voulez..." onChange={handleChange} required/>
          </div>
          <div className="field">
            <label htmlFor="price">Prix (€)</label>
            <input name='price' min="10" max="1000000000" step={0.01} type="number" value={gig.price} onChange={handleChange} required/>
          </div>
          <div className="field-grid">
          <div className="field">
            <label htmlFor="deliveryTime">Temps de livraison (jours)</label>
            <input name='deliveryTime' min="1" step={1} max="365" type="number" value={gig.deliveryTime} onChange={handleChange} required/>
          </div>
          <div className="field">
            <label htmlFor="revisionNumber">Nombre de modifications maximum</label>
            <input name='revisionNumber' min="1" step={1} max="10" type="number" value={gig.revisionNumber} onChange={handleChange} required/>
          </div>
          </div>
          <div className="field">
            <label>Couverture</label>
            {preview !== undefined && preview !== "" ? (
              <div className="preview">
                {file !== null ? (
                  isVideo(file) ? (
                    <video key={Date.now()} controls>
                      <source src={URL.createObjectURL(file)} />
                    </video>
                  ) : (
                    <img src={URL.createObjectURL(file)} alt="" />
                  )
                ) : preview.includes('video/') ? (
                  <video key={Date.now()} controls>
                    <source src={preview} />
                  </video>
                ) : (
                  <img src={preview} alt="" />
                )}
              </div>
            ) : null}
            <input
              name="file"
              type="file"
              accept='.png, .jpg, .jpeg, video/mp4, video/x-m4v, video/*'
              onChange={handleFileChange}
              required
            />
            {fileSizeExceeded && (
              <p className="error">Le fichier est trop volumineux.</p>
            )}
          </div>
          <button className='btn' type="submit">💾 Enregistrer les modifications</button>
          {error && <p className="error">{error}</p>}
          <button className='btn secondary' type='button' onClick={handleDelete}>❌ Supprimer</button>
        </form>
      </div>
    </>
  );
}

export default EditGig;
