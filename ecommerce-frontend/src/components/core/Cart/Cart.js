import React, { useState, useEffect } from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { getCart } from './cartHelpers';
import Card from '../Card/Card';
import Checkout from './Checkout';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h3 className=" home center mt mb">
          Your Cart has {`${items.length}`} items
        </h3>

        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            addToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
            displayGrades={false}
          />
        ))}
      </div>
    );
  };

  const noItemMessage = () => {
    return (
      <div className="container">
        <h3 className="home mt-4">
          Your Cart is Empty. <br /> <br />
        </h3>
        <Link className="continue " to="/shop">
          Continue Shopping...
        </Link>
      </div>
    );
  };

  return (
    <div>
      <Layout
        title="Shopping Cart"
        description="Manage your cart items"
        className="singlePro"
      >
        <div className="container">
          <h3 className="mb-4 orderHead center">Your Cart Summary</h3>
          <hr />
          <div className=" col s12 m6 l4">
            {items.length > 0 ? showItems(items) : noItemMessage()}
          </div>

          <div className="col s12 m6 l8">
            <Checkout products={items} setRun={setRun} run={run} />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Cart;
