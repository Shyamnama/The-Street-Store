import React, { useState, useEffect } from 'react';
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from '../apiCore/apiCore';
import { emptyCart } from './cartHelpers';
import { isAuthenticate } from '../../auth';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
// import Layout from './Layout';
// import Card from './Card';

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
  });

  const userId = isAuthenticate() && isAuthenticate().user._id;
  const token = isAuthenticate() && isAuthenticate().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setData({ ...data, error: data.error });
      } else {
        console.log(data);
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
    // eslint-disable-next-line
  }, []);

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const getTotal = () => {
    return products.reduce((acc, cur) => {
      return acc + cur.count * cur.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticate() ? (
      <div>{showDropIn()}</div>
    ) : (
      <div className="center">
        <Link to="/signin">
          <button className="btn btn-block hoverable">
            Sign in to Checkout
          </button>
        </Link>
      </div>
    );
  };

  let deliveryAddress = data.address;

  const buy = () => {
    setData({ loading: true });

    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        console.log(getNonce);

        processPayment(userId, token, paymentData)
          .then((response) => {
            console.log(response);

            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress,
            };

            createOrder(userId, token, createOrderData)
              .then((response) => {
                emptyCart(() => {
                  setRun(!run); // run useEffect in parent Cart
                  console.log('payment success and empty cart');
                  setData({
                    loading: false,
                    success: true,
                  });
                });
              })
              .catch((error) => {
                console.log(error);
                setData({ loading: false });
              });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => {
    return (
      <div onBlur={() => setData({ ...data, error: '' })}>
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  id="textarea"
                  onChange={handleAddress}
                  className="materialize-textarea"
                  required
                  value={data.address}
                />
                <label htmlFor="textarea">Delivery Address</label>
              </div>
            </div>

            <DropIn
              options={{
                authorization: data.clientToken,
              }}
              onInstance={(instance) => (data.instance = instance)}
            />
            <button onClick={buy} className="btn  btn-block hoverable">
              Pay Now
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  const showError = (error) => (
    <div className="alert" style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div className="alert-info" style={{ display: success ? '' : 'none' }}>
      Thanks! Your payment was successful !
    </div>
  );

  const showLoading = (loading) => {
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
      <h4 className="cartTotal center">Total: Rs.{getTotal()}</h4>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
