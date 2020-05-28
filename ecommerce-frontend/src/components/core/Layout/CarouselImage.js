import React from 'react';
import { Zoom } from 'react-slideshow-image';
import image1 from '../../../images/1.jpg';
import image2 from '../../../images/2.jpg';
import image3 from '../../../images/3.jpg';
import image4 from '../../../images/4.jpg';

const images = [image1, image2, image3, image4];

const zoomInProperties = {
  duration: 3000,
  transitionDuration: 700,
  infinite: true,
  indicators: true,
  scale: 1.88,
  arrows: true,
  autoplay: true,
};

const CarouselImage = () => {
  return (
    <div className="slide-container">
      <Zoom {...zoomInProperties}>
        {images.map((each, index) => (
          <img key={index} style={{ width: '100%' }} src={each} alt="" />
        ))}
      </Zoom>
    </div>
  );
};

export default CarouselImage;
