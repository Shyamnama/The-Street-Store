import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout/Layout';
import { isAuthenticate } from '../auth/index';
import { Link } from 'react-router-dom';
import { getPurchaseHistory } from './apiUser';
import moment from 'moment';

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const {
    user: { _id, name, email, role },
  } = isAuthenticate();

  const token = isAuthenticate().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
    // eslint-disable-next-line
  }, []);

  const userLinks = () => {
    return (
      <ul className="collection with-header">
        <li className=" teal grey-text text-darken-3 collection-header">
          <h5>
            <i className="small material-icons right">link</i>
            User Links
          </h5>
        </li>
        <li className="quan collection-item">
          <Link className=" green-text text-darken-1" to="/cart">
            My Cart{' '}
          </Link>
        </li>
        <li className="quan collection-item">
          <Link className=" green-text text-darken-1" to={`/profile/${_id}`}>
            Update Profile{' '}
          </Link>
        </li>
      </ul>
    );
  };

  const userInfo = () => {
    return (
      <ul className="collection with-header">
        <li className=" teal grey-text text-darken-3 collection-header">
          <h5>
            User Information
            <i className="small material-icons left">account_circle</i>
          </h5>
        </li>
        <li className="quan grey-text text-darken-2 collection-item">
          {name}
          <i className=" material-icons left">person</i>
        </li>
        <li className="quan grey-text text-darken-2 collection-item">
          {email}
          <i className=" material-icons left">contact_mail</i>
        </li>
        <li className="quan grey-text text-darken-2 collection-item">
          {role === 1 ? 'Admin' : 'Registered User'}
          <i className=" material-icons left">person_pin</i>
        </li>
      </ul>
    );
  };

  const purchaseHistory = (history) => {
    return (
      <ul class="collection with-header">
        <li class=" collection-header">
          <h5 className="grey-text text-darken-4">
            Purchase History
            <i className="small material-icons left">history</i>
          </h5>
        </li>
        <li className="grey-text text-darken-3 cli collection-item">
          {history.map((h, i) => {
            return (
              <div>
                {h.products.map((p, i) => {
                  return (
                    <div key={i} className="mb-4 mt-4">
                      <h7 className="quan">Transaction ID : {h._id}</h7>
                      <br />
                      <h7 className="quan">Product Name : {p.name}</h7>
                      <br />
                      <h7 className="quan">Total Amount : Rs. {h.amount}</h7>
                      <br />
                      <h7 className="quan">Quantity : {p.count}</h7>
                      <br />
                      <h7 className="quan">
                        Purchased Date : {moment(h.createdAt).format('LLLL')}
                      </h7>
                      <br />
                      <br />
                      <hr />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </li>
      </ul>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`Hello, ${name}`}
      className="container"
    >
      <div class="row">
        <div class="col s12 m6 l6">{userInfo()}</div>
        <div class="col s12 m6 l6">{userLinks()}</div>

        <div className="col s12">{purchaseHistory(history)}</div>
      </div>
    </Layout>
  );
};

export default Dashboard;
