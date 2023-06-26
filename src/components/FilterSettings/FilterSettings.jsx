import React from 'react';
import "./FilterSettings.css";

function FilterSettings({active=""}) {
  return (
    <div className='filter-settings' id={active}>
        <div className="input">
            <label htmlFor="min">Prix min</label>
            <input type="number" name="min" id="" />
        </div>
        <div className="input">
            <label htmlFor="max">Prix max</label>
            <input type="number" name="max" id="" />
        </div>
        <div className="input">
            <label htmlFor="country">Pays</label>
            <input type="text" name="country" id="" />
        </div>
    </div>
  )
}

export default FilterSettings;