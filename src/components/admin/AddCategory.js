import React, { useState } from 'react';
import Layout from '../core/Layout/Layout';
import { isAuthenticate } from '../auth/index';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticate();

  const handleChange = (e) => {
    setError('');
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError('');
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => {
    return (
      <div className="row">
        <form className="input-field col s12" onSubmit={clickSubmit}>
          <label htmlFor="category">Category Name</label>
          <input
            id="category"
            type="text"
            onChange={handleChange}
            value={name}
            autoFocus
            required
          />
          <button className=" blue-grey darken-4 waves-effect waves-light btn">
            <i className="material-icons right">create</i>
            Create Category
          </button>
        </form>
      </div>
    );
  };

  const showSuccess = () => {
    if (success) {
      return <h6 className="alert-info">{name} is created successfully</h6>;
    }
  };

  const showError = () => {
    if (error) {
      return <h6 className="alert">Category should be unique</h6>;
    }
  };

  const goBack = () => {
    return (
      <Link className="grey-text text-darken-2" to="/admin/dashboard">
        <i className=" material-icons left">arrow_back</i>
        Back To Dashboard
      </Link>
    );
  };

  return (
    <div>
      <Layout
        title="Add Category"
        description="Add a new category"
        className="container"
      >
        <div className="category">
          <div className="col s10 offset-s1 ">
            {showSuccess()}
            {showError()}
            {newCategoryForm()}
            {goBack()}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AddCategory;
