import React, { useState } from 'react';

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    //return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];

    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    // console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((c, i) => (
    <div className="">
      <label className="grey-text text-darken-3 ">
        <li key={i}>
          <input
            onChange={handleToggle(c._id)}
            value={checked.indexOf(c._id === -1)}
            type="checkbox"
          />
          <span className="check">{c.name}</span>
        </li>
      </label>
    </div>
  ));
};

export default Checkbox;
