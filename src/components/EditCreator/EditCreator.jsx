import React from 'react'
import MediaField from '../MediaField/MediaField';

function EditCreator() {
  return (
    <form className='form' action="">
          <div className="image-field">
            <img src="/img/pp/noavatar.jpg" alt="" />
            <input type="file" name="" id="" />
          </div>
          <div className="field">
            <label htmlFor="">Nom d'utilisateur</label>
            <input type="text" placeholder='ex : Antoine' />
          </div>
          <div className="field">
            <label htmlFor="">Bio</label>
            <input type="text" placeholder='ex : Streamer depuis 5 ans' />
          </div>
          <div className="field">
            <label htmlFor="">Localisation</label>
            <input type="text" placeholder='ex : Paris, France' />
          </div>
          <div className="field">
            <label htmlFor="">Instagram</label>
            <input type="text" placeholder='ex : https://www.instagram.com/identifiant' />
          </div>
          <div className="field">
            <label htmlFor="">Tik Tok</label>
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
          <div className="medias-field">
            <div className="pf-title">
              <p htmlFor="">Portfolio</p>
              <button type='button'>+</button>
            </div>
            <div className="pf-list">
                <MediaField/> 
                <MediaField defaultType="video"/> 
                <MediaField/> 
              </div>
          </div>
          <button className='btn' type="submit">Enregister les modifications</button>
        </form>
  )
}

export default EditCreator;