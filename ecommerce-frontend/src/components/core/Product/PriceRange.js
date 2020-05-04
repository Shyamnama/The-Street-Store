import React, { useState } from 'react';

const PriceRange = ({ prices, handleFilters }) => {
  //eslint-disable-next-line
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  return prices.map((p, i) => (
    <div key={i}>
      <label className="grey-text text-darken-3">
        <input
          onChange={handleChange}
          value={`${p._id}`}
          type="radio"
          className="with-gap"
          name={p}
        />
        <span>{p.name}</span>
      </label>
    </div>
  ));
};

export default PriceRange;
