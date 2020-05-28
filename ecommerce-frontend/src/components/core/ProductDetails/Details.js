import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import { addItem, updateItem, removeItem } from '../Cart/cartHelpers';
import DetailImage from './DetailImage';
import StarRating from '../Card/StarRating';

const Details = ({
  product,
  showViewProductButton = true,
  displayGrades = true,
  addToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <div className="hoverable viewProduct">View Product</div>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartButton = (addToCartButton) => {
    return (
      addToCartButton && (
        <div
          onClick={addToCart}
          className="  hoverable grey-text text-darken-4 addCart "
        >
          <i className="material-icons left">add_shopping_cart</i>
          Add to cart
        </div>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge1">In Stock</span>
    ) : (
      <span className="badge1">Out of Stock</span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOption = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className="row quantity">
          <span className="left quan2">Quantity : </span>
          <div className="col s4">
            <input
              type="number"
              className="center"
              style={{ borderBottom: 'none' }}
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          className="rmv btn hoverable left"
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
        >
          Remove
          <i className="material-icons right">remove_shopping_cart</i>
        </button>
      )
    );
  };

  const showGrades = (displayGrades) => {
    return displayGrades && <StarRating totalStars={5} />;
  };

  return (
    <div className="row ">
      <div className="col s12 m6 l4 ">
        <DetailImage item={product} url="product" />
      </div>
      <div className="col s12 m6 l7">
        {shouldRedirect(redirect)}
        <span className="card-title2">{product.name}</span>
        <p className="product-desc2">{product.description}</p>
        <p className="product-para2">{product.price} Rs.</p>
        <div className="line2">
          <p className="grey-text text-darken-4 cate2">
            Category :
            <span
              className=" blue-grey-text text-darken-4
            "
            >
              {product.category && product.category.name}
            </span>
          </p>
          <span className="cate3 ">{showGrades(displayGrades)}</span>
        </div>
        <p className=" cate2">Added {moment(product.createdAt).fromNow()}</p>
        <div className="mb-4">{showStock(product.quantity)}</div>
        {showAddToCartButton(addToCartButton)}
        {showViewButton(showViewProductButton)}
        {showRemoveButton(showRemoveProductButton)}
        {showCartUpdateOption(cartUpdate)}
      </div>
    </div>
  );
};

export default Details;
