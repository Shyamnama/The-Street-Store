import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout/Layout';
import { isAuthenticate } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getCategory, updateCategory } from './apiAdmin';

const UpdateCategory = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    error: '',
    redirectToProfile: false,
    formData: '',
  });

  const { user, token } = isAuthenticate();

  const { name, error, redirectToProfile } = values;

  const init = (categoryId) => {
    getCategory(categoryId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.categoryId);
    // eslint-disable-next-line
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const submitCategoryForm = (e) => {
    e.preventDefault();
    const category = {
      name: name,
    };
    updateCategory(match.params.categoryId, user._id, token, category).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: data.name,
            error: false,
            redirectToProfile: true,
          });
        }
      }
    );
  };

  const updateCategoryForm = () => {
    return (
      <div>
        <form onSubmit={submitCategoryForm}>
          <span>Update Category Form</span>
          <span>Category Name</span>
          <br />
          <br />
          <div>
            <input
              type="text"
              onChange={handleChange('name')}
              value={name}
              required
              name="name"
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  };

  const showError = () => {
    return (
      <div className="alert" style={{ display: error ? '' : 'none' }}>
        <button className="btn">
          <span>&times;</span>
        </button>
      </div>
    );
  };

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/admin/categories" />;
      }
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
        title={`Hi ${user.name}`}
        description={`This is Update Product Action Page`}
        className="container"
      >
        <div className="row">
          <div className="col-md-8 offset-md-2 m-b-250 mb-5">
            {showError()}
            {updateCategoryForm()}
            {goBack()}
            {redirectUser()}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default UpdateCategory;
