import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { signout, isAuthenticate } from '../../auth';

const Footer = () => {
  return (
    <footer className="page-footer foot">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="grey-text text-lighten-1 foot-title">
              The Street Store
            </h5>
            <p className="grey-text text-lighten-1 foot-para">
              If you would like to experience the best of online shopping in
              India, you are at the right place. The Street Store is the
              ultimate destination for fashion and lifestyle, being host to a
              wide array of merchandise including clothing, footwear and more.
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="grey-text text-lighten-2 foot-title">Links</h5>
            <ul>
              <li>
                <Link to="/" className="links">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="links">
                  Shop
                </Link>
              </li>
              {isAuthenticate() && isAuthenticate().user.role === 0 && (
                <li>
                  <Link className="links" to="/user/dashboard">
                    My Profile
                  </Link>
                </li>
              )}
              {isAuthenticate() && isAuthenticate().user.role === 1 && (
                <li>
                  <Link className="links" to="/admin/dashboard">
                    My Profile
                  </Link>
                </li>
              )}

              {!isAuthenticate() && (
                <Fragment>
                  <li>
                    <Link className="links" to="/signin">
                      Signin
                    </Link>
                  </li>
                  <li>
                    <Link className="links" to="/signup">
                      Signup
                    </Link>
                  </li>
                </Fragment>
              )}
              {isAuthenticate() && (
                <Fragment>
                  <li>
                    <Link
                      to="/signin"
                      className=" signout links"
                      onClick={() => signout(() => {})}
                    >
                      Signout
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="social-icons center">
        <ul>
          <li>
            <a
              href="https://www.facebook.com/"
              className=" btn-floating social facebook"
            >
              <i className="fa fa-facebook fb "></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com"
              className=" btn-floating social instagram"
            >
              <i className="fa fa-instagram insta pink-text text-darken-1 "></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.googleplus.com"
              className=" btn-floating social google"
            >
              <i className="fa fa-google goog "></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.twitter.com"
              className=" btn-floating social twitter"
            >
              <i className="fa fa-twitter tweet "></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.pinterest.com"
              className=" btn-floating social pinterest"
            >
              <i className="fa fa-pinterest pint "></i>
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-copyright">
        <div className="container center grey-text text-lighten-2">
          © 2020 The Street Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
