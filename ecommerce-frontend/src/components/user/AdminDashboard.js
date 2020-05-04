import React from 'react';
import Layout from '../core/Layout/Layout';
import { isAuthenticate } from '../auth/index';
import { Link } from 'react-router-dom';

const adminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticate();

  const adminLinks = () => {
    return (
      <ul className="collection with-header">
        <li className=" teal grey-text text-darken-3 collection-header">
          <h5>
            <i className="small material-icons right">link</i>
            Admin Links
          </h5>
        </li>
        <li className="quan  collection-item">
          <Link className="blue-grey-text text-darken-3" to="/create/category">
            Create Category
          </Link>
        </li>
        <li className="quan collection-item">
          <Link className="blue-grey-text text-darken-3" to="/create/product">
            Add Product
          </Link>
        </li>
        <li className="quan collection-item">
          <Link className="blue-grey-text text-darken-3" to="/admin/products">
            Manage Products
          </Link>
        </li>
        <li className="quan collection-item">
          <Link className="blue-grey-text text-darken-3" to="/admin/orders">
            View Orders
          </Link>
        </li>
        <li className="quan collection-item">
          <Link className="blue-grey-text text-darken-3" to="/user/dashboard">
            My User Panel
          </Link>
        </li>
      </ul>
    );
  };

  const adminInfo = () => {
    return (
      <ul className="collection with-header">
        <li className=" teal grey-text text-darken-3 collection-header">
          <h5>
            Admin Information
            <i className="small material-icons left">account_circle</i>
          </h5>
        </li>
        <li className="quan grey-text text-darken-2 collection-item">
          {name}
          <i className=" material-icons left">verified_user</i>
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

  return (
    <Layout
      title="Admin Panel"
      description={`Hello, ${name}`}
      className="container"
    >
      <div className="row">
        <div className="col s12 m12 l6">{adminInfo()}</div>
        <div className="col s12 m12 l6">{adminLinks()}</div>
      </div>
    </Layout>
  );
};

export default adminDashboard;
