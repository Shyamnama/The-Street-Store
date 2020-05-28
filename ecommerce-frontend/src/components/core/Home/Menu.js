import React, { Fragment, useEffect } from 'react';
import './Home.css';
import { Link, withRouter } from 'react-router-dom';
import Logo from '../../../images/logo.png';
import { signout, isAuthenticate } from '../../auth';
import { itemTotal } from '../Cart/cartHelpers';
import M from 'materialize-css/dist/js/materialize.min.js';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#c4ff01' };
  } else {
    return { color: '#ebe8e8' };
  }
};

const Menu = ({ history }) => {
  useEffect(() => {
    let sidenav = document.querySelector('#slide-out');
    M.Sidenav.init(sidenav, {});
  }, []);

  return (
    <div>
      <nav>
        <div className="nav-wrapper navWrap">
          <div className="container">
            <Link to="/" className="brand-logo">
              <img className="logo" src={Logo} alt="" />
            </Link>
            <Link to="/" data-target="slide-out" className="sidenav-trigger ">
              <i className=" material-icons grey-text text-lighten-1">menu</i>
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link className="" to="/" style={isActive(history, '/')}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className=" "
                  to="/shop"
                  style={isActive(history, '/shop')}
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  className=" cart"
                  to="/cart"
                  style={isActive(history, '/cart')}
                >
                  Cart
                  <i className="tiny material-icons prefix">shopping_cart</i>
                  <small className="cart-badge">[{itemTotal()}]</small>
                </Link>
              </li>

              {isAuthenticate() && isAuthenticate().user.role === 0 && (
                <li>
                  <Link
                    className=""
                    to="/user/dashboard"
                    style={isActive(history, '/user/dashboard')}
                  >
                    My Profile
                  </Link>
                </li>
              )}

              {isAuthenticate() && isAuthenticate().user.role === 1 && (
                <li>
                  <Link
                    className=""
                    to="/admin/dashboard"
                    style={isActive(history, '/admin/dashboard')}
                  >
                    My Profile
                  </Link>
                </li>
              )}

              {!isAuthenticate() && (
                <Fragment>
                  <li>
                    <Link
                      className=""
                      to="/signin"
                      style={isActive(history, '/signin')}
                    >
                      Signin
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=""
                      to="/signup"
                      style={isActive(history, '/signup')}
                    >
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
                      className=" signout "
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
      </nav>

      <ul className="sidenav" id="slide-out">
        <li>
          <div className="user-view">
            <h5 className="title">The Street Store</h5>
          </div>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        {isAuthenticate() && isAuthenticate().user.role === 0 && (
          <li>
            <Link to="/user/dashboard">My Profile</Link>
          </li>
        )}

        {isAuthenticate() && isAuthenticate().user.role === 1 && (
          <li>
            <Link to="/admin/dashboard">My Profile</Link>
          </li>
        )}
        {!isAuthenticate() && (
          <Fragment>
            <li>
              <Link to="/signin">Signin</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </Fragment>
        )}
        {isAuthenticate() && (
          <Fragment>
            <li>
              <Link to="/signin" onClick={() => signout(() => {})}>
                Signout
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
