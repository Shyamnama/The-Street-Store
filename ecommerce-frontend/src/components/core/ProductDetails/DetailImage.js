import React from 'react';
import { API } from '../../../config';
import { SRLWrapper } from 'simple-react-lightbox';

const options = {
  settings: {
    autoplay: 0,
    disablePanzoom: true,
    lightboxTransitionSpeed: 0.4,
  },
  buttons: {
    showAutoplayButton: false,
    showDownloadButton: false,
    showFullscreenButton: false,
    showNextButton: false,
    showPrevButton: false,
    showThumbnailsButton: false,
  },
  thumbnails: {
    showThumbnails: false,
  },
  caption: {
    showCaption: false,
  },
};

const DetailImage = ({ item, url }) => {
  return (
    <SRLWrapper options={options}>
      <img
        className="responsive-img "
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        style={{ cursor: 'zoom-in' }}
      />
    </SRLWrapper>
  );
};

export default DetailImage;
