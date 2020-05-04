import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout/Layout';
import { deleteProduct, getProducts } from './apiAdmin';
import { isAuthenticate } from '../auth/index';
import { Link } from 'react-router-dom';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticate();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

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
        description="Edit Product details"
        title="Manage Products"
        className="container"
      >
        <div className="row">
          <div className="col s12">
            <h4>Total {products.length} products</h4>
            <hr />
            <ul className="collection">
              {products.map((p, i) => (
                <li key={i} className="quan collection-item ">
                  {p.name}
                  <button
                    onClick={() => destroy(p._id)}
                    className="delBtn btn btn-small red darken-1 right"
                  >
                    Delete
                    <i className="material-icons right">delete</i>
                  </button>
                  <Link to={`/admin/product/update/${p._id}`}>
                    <button className="upBtn btn btn-small green darken-1 right">
                      Edit
                      <i className="material-icons right">create</i>
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {goBack()}
        </div>
      </Layout>
    </div>
  );
};

export default ManageProducts;
