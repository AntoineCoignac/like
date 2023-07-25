import React from 'react';
import "./FilterSettings.css";

function FilterSettings({ active = "", filters = {}, setFilters = () => { } }) {
  return (
    <div className='filter-settings' id={active}>
      <div className="input">
        <label htmlFor="min">Prix min</label>
        <input type="number"
        defaultValue={filters.min}
        onChange={(e) => setFilters((prev) => ({
          ...prev,
          min: e.target.value,
        }))} name="min" id="" />
      </div>
      <div className="input">
        <label htmlFor="max">Prix max</label>
        <input type="number"
        defaultValue={filters.max}
        onChange={(e) => setFilters((prev) => ({
          ...prev,
          max: e.target.value,
        }))} name="max" id="" />
      </div>
    </div>
  )
}

export default FilterSettings;