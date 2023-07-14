import React from 'react';
import "./FilterSettings.css";

function FilterSettings({active=""}) {
  return (
    <div className='filter-settings' id={active}>
        <div className="input">
            <label htmlFor="min">Prix min</label>
            <input type="number" defaultValue={0} name="min" id="" />
        </div>
        <div className="input">
            <label htmlFor="max">Prix max</label>
            <input type="number" defaultValue={100000} name="max" id="" />
        </div>
    </div>
  )
}

export default FilterSettings;