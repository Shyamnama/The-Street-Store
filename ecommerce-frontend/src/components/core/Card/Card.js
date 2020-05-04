import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import { addItem, updateItem, removeItem } from '../Cart/cartHelpers';
import StarRating from './StarRating';

const Card = ({
  product,
  displayGrades = true,
  showViewProductButton = true,
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
        <div onClick={addToCart} className="hoverable addCart ">
          <i className="material-icons prefix">add_shopping_cart</i>
          Add To Cart
        </div>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <div className="badge">In Stock</div>
    ) : (
      <div className="badge">Out of Stock</div>
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
        <div className=" quantity">
          <span className="left qn">Quantity : </span>
          <div className="num col s4">
            <input
              type="number"
              className="center grey-text text-lighten-3"
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
        <div
          className=" addCart"
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
        >
          Remove
        </div>
      )
    );
  };

  const showGrades = (displayGrades) => {
    return displayGrades && <StarRating totalStars={5} />;
  };

  return (
    <div className="card z-depth-3">
      <div className="card-image">
        <ShowImage item={product} url="product" />
      </div>
      <div className="card-content">
        {shouldRedirect(redirect)}
        <span className="card-title">{product.name}</span>

        <div className="line row">
          <p className="product-para col s2">{product.price} Rs.</p>
          <p className="grey-text text-lighten-4 cate col s10">
            Category :{'   '}
            <span className=" blue-text text-lighten-4">
              {product.category && product.category.name}
            </span>
          </p>
        </div>

        <div className="line row">
          <div className="stock col s4 ">{showStock(product.quantity)}</div>
          <div className="cate3 col s8 ">{showGrades(displayGrades)}</div>
        </div>

        <div className="row">
          {showCartUpdateOption(cartUpdate)}
          <div className="col s12">{showAddToCartButton(addToCartButton)}</div>
          <div className="col s12">
            {showRemoveButton(showRemoveProductButton)}
          </div>
          <div className="col s12">{showViewButton(showViewProductButton)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
