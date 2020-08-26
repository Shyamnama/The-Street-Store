import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout/Layout';
import { isAuthenticate } from '../auth/index';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  });

  const { user, token } = isAuthenticate();

  const {
    name,
    description,
    price,
    categories,
    quantity,
    loading,
    error,
    createdProduct,
    // redirectToProfile,
    formData,
  } = values;

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          price: '',
          quantity: '',
          photo: '',
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const newPostForm = () => {
    return (
      <div>
        <form className="m3" onSubmit={clickSubmit}>
          <div className="input-field">
            <input
              onChange={handleChange('name')}
              id="name"
              type="text"
              value={name}
              autoComplete="off"
            />
            <label htmlFor="name">Name</label>
          </div>

          <div className="input-field">
            <input
              onChange={handleChange('price')}
              id="price"
              type="number"
              value={price}
              autoComplete="off"
            />
            <label htmlFor="price">Price</label>
          </div>

          <div className="input-field">
            <input
              onChange={handleChange('quantity')}
              id="quantity"
              type="number"
              min="1"
              value={quantity}
            />
            <label htmlFor="quantity">Quantity</label>
          </div>

          <div className="file-field input-field">
            <div className="btn blue darken-2 hoverable">
              <i className=" material-icons right">add_a_photo</i>
              <span>Product Image</span>
              <input
                onChange={handleChange('photo')}
                type="file"
                name="photo"
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>

          <div className="input-field col s12 m6">
            <select onChange={handleChange('shipping')}>
              <option defaultValue="">Shipping</option>
              <option value="0">NO</option>
              <option value="1">YES</option>
            </select>
          </div>

          <div className="input-field col s12 m6">
            <select onChange={handleChange('category')}>
              <option disabled selected>
                Category
              </option>
              {categories &&
                categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="input-field col s12">
            <textarea
              className="materialize-textarea"
              onChange={handleChange('description')}
              id="description"
              value={description}
            />
            <label htmlFor="description">Description</label>
          </div>
          <button className=" btn green darken-2 hoverable">Add Product</button>
        </form>
        <div className="mt-4">
          <Link className=" grey-text text-darken-2 " to="/admin/dashboard">
            <i className=" material-icons left">arrow_back</i>
            Back To Dashboard
          </Link>
        </div>
      </div>
    );
  };

  const showError = () => {
    return (
      <div className="alert" style={{ display: error ? '' : 'none' }}>
        {error}
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="alert-info"
        style={{ display: createdProduct ? '' : 'none' }}
      >
        <div>{`${createdProduct}`} is added successfully</div>
      </div>
    );
  };

  const showLoading = () => {
    return (
      loading && (
        <div className="center">
          <div className="preloader-wrapper small active center">
            <div className="spinner-layer spinner-orange-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <div>
      <Layout
        title="Add Product"
        description="Add a new product"
        className="container"
      >
        <div className="product">
          <div className="col s10 offset-s1 ">
            {showLoading()}
            {showError()}
            {showSuccess()}
            {newPostForm()}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AddProduct;
