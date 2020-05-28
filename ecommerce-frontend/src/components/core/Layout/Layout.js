import React from 'react';
import './Layout.css';
import Menu from '../Home/Menu';
import Footer from './Footer';
import SimpleReactLightbox from 'simple-react-lightbox';

const Layout = ({
  title = 'Title',
  description = 'Description',
  children,
  className,
}) => {
  return (
    <div>
      <SimpleReactLightbox>
        <Menu />
        <div className="row">
          <div className="head">
            <h3 className="head2">{title}</h3>
          </div>
          <p className="para">{description}</p>
          <div className={className}>{children}</div>
        </div>
        <Footer />
      </SimpleReactLightbox>
    </div>
  );
};

export default Layout;
