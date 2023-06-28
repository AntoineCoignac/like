import React from 'react'

function EditBrand() {
  return (
    <form className='form' action="">
          <div className="image-field">
            <img src="/img/pp/noavatar.jpg" alt="" />
            <input type="file" name="" id="" />
          </div>
          <div className="field">
            <label htmlFor="">Dénomination sociale</label>
            <input type="text" placeholder='ex : Like' />
          </div>
          <div className="field">
            <label htmlFor="">Localisation</label>
            <input type="text" placeholder='ex : Paris, France' />
          </div>
          <div className="field">
            <label htmlFor="">Secteur d'activité</label>
            <div className="choices">
              <div className="choice">
                <input type="radio" name="activity" value="agro" defaultChecked />
                <label htmlFor="agro">Agroalimentaire</label>
              </div>
              <div className="choice">
                <input type="radio" name="activity" value="bank" />
                <label htmlFor="bank">Banque et assurance</label>
              </div>
              <div className="choice">
                <input type="radio" name="activity" value="wood" />
                <label htmlFor="wood">Bois et imprimerie</label>
              </div>
              <div className="choice">
                <input type="radio" name="activity" value="construction" />
                <label htmlFor="construction">BTP</label>
              </div>
              <div className="choice">
                <input type="radio" name="activity" value="chemistry" />
                <label htmlFor="chemistry">Chimie</label>
              </div>
              <div className="choice">
                <input type="radio" name="activity" value="commerce" />
                <label htmlFor="commerce">Commerce</label>
              </div>
              <div className="choice">
                <input type="radio" name="activity" value="publishing" />
                <label htmlFor="publishing">Communication et multimédia</label>
              </div>
              <div className="choice">
                <input type="radio" name="activity" value="digital" />
                <label htmlFor="digital">Digital</label>
              </div>
              <div className="choice">
                <input type="radio" name="activity" value="electronics" />
                <label htmlFor="electronics">Électronique</label>
              </div>
              <div className="choice">
                <input type="radio" name="activity" value="consulting" />
                <label htmlFor="consulting">Études et conseils</label>
              </div>
              <div className="choice">
                <input type="radio" name="activity" value="pharmaceutical" />
                <label htmlFor="pharmaceutical">Industrie pharmaceutique</label>
              </div>
              <div className="choice">
                <input type="radio" name="activity" value="it" />
                <label htmlFor="it">Informatique et télécoms</label>
              </div>
              <div className="choice">
                <input type="radio" name="activity" value="machinery" />
                <label htmlFor="machinery">Machinerie et automobile</label>
              </div>
              <div className="choice">
                <input type="radio" name="activity" value="metallurgy" />
                <label htmlFor="metallurgy">Métallurgie</label>
              </div>
              <div className="choice">
                <input type="radio" name="activity" value="plastics" />
                <label htmlFor="plastics">Plastique</label>
              </div>
              <div className="choice">
                <input type="radio" name="activity" value="business-services" />
                <label htmlFor="business-services">Services aux entreprises</label>
              </div>
              <div className="choice">
                <input type="radio" name="activity" value="textile" />
                <label htmlFor="textile">Textile</label>
              </div>
              <div className="choice">
                <input type="radio" name="activity" value="transport" />
                <label htmlFor="transport">Transports et logistique</label>
              </div>
            </div>
          </div>
          <button type="submit">Enregister les modifications</button>
        </form>
  )
}

export default EditBrand;