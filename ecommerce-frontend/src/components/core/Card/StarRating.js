import React, { useState } from 'react';
import './Card.css';

const Star = ({ selected = false, onClick = (f) => f }) => (
  <div className={selected ? 'star selected' : 'star'} onClick={onClick} />
);

const StarRating = ({ totalStars }) => {
  const [starsSelected, selectStar] = useState(4);
  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={i < starsSelected}
          onClick={() => selectStar(i + 1)}
        />
      ))}
      <p className="grade">
        {starsSelected} of {totalStars} stars
      </p>
    </div>
  );
};

export default StarRating;
