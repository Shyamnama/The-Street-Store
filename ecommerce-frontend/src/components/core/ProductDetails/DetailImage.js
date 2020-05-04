import React from 'react';
import { API } from '../../../config';

const DetailImage = ({ item, url }) => {
  return (
    <img
      className="responsive-img"
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
    />
  );
};

export default DetailImage;
