import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout/Layout';
import { isAuthenticate } from '../auth/index';
import { Link, Redirect } from 'react-router-dom';
import { getProduct, getCategories, updateProduct } from './apiAdmin';

const UpdateProduct = ({ match }) => {
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
    error: false,
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  });

  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticate();

  const {
    name,
    description,
    price,
    quantity,
    loading,
    error,
    createdProduct,
    formData,
    redirectToProfile,
  } = values;

  const init = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          shipping: data.shipping,
          quantity: data.quantity,
          formData: new FormData(),
        });
        initCategories();
      }
    });
  };

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init(match.params.productId);
    // eslint-disable-next-line
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });
    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
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
            error: false,
            redirectToProfile: true,
            createdProduct: data.name,
          });
        }
      }
    );
  };

  const newPostForm = () => {
    return (
      <div>
        <h4 className="orderHead center">Update Product</h4>
        <form className="mt" onSubmit={clickSubmit}>
          <div>
            <label>Name</label>
            <input
              onChange={handleChange('name')}
              type="text"
              value={name}
              autoComplete="off"
            />
          </div>

          <div>
            <label>Price</label>
            <input
              onChange={handleChange('price')}
              type="number"
              value={price}
              autoComplete="off"
            />
          </div>

          <div>
            <label>Quantity</label>
            <input
              onChange={handleChange('quantity')}
              type="number"
              value={quantity}
            />
          </div>

          <div className="file-field input-field">
            <div className="btn blue darken-2 hoverable">
              <i className=" material-icons right">add_a_photo</i>
              <span>Update Product Image</span>
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
              <option disabled selected>
                Shipping
              </option>
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

          <div>
            <label>Description</label>
            <textarea
              className="materialize-textarea"
              onChange={handleChange('description')}
              value={description}
            />
          </div>
          <button className=" btn green darken-2 hoverable">
            Update Product
          </button>
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
        <h3>{`${createdProduct}`} is updated ! </h3>
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

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/admin/products" />;
      }
    }
  };

  return (
    <div>
      <Layout
        title="Update Product"
        description="Update existing product"
        className="container"
      >
        <div className="col s10 offset-s1 ">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {redirectUser()}
        </div>
      </Layout>
    </div>
  );
};

export default UpdateProduct;
