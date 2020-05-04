import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import image1 from '../../../images/1.jpg';
import image2 from '../../../images/2.jpg';
import image3 from '../../../images/3.jpg';
import image4 from '../../../images/4.jpg';

const CarouselImage = () => {
  return (
    <Carousel
      showArrows={false}
      showStatus={false}
      infiniteLoop={true}
      showThumbs={false}
      useKeyboardArrows={true}
      autoPlay={true}
      interval={4000}
      stopOnHover={false}
      dynamicHeight={true}
    >
      <div>
        <img src={image2} alt="" />
      </div>
      <div>
        <img src={image1} alt="" />
      </div>
      <div>
        <img src={image3} alt="" />
      </div>
      <div>
        <img src={image4} alt="" />
      </div>
    </Carousel>
  );
};

export default CarouselImage;
