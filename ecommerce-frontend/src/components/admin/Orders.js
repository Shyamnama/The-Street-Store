import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout/Layout';
import { isAuthenticate } from '../auth/index';
// import { Link } from 'react-router-dom';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticate();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
    // eslint-disable-next-line
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h4 className="orderHead mt-4 center">Total Orders: {orders.length}</h4>
      );
    } else {
      return <h4 className="orderHead center">No Orders</h4>;
    }
  };

  const showInput = (key, value) => {
    return (
      <div className="row ">
        <div className="quan">
          {key} : {value}
        </div>
      </div>
    );
  };

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log('Status Update Failed');
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => {
    return (
      <div className="input-field">
        <h5 className="green-text text-darken-2">Status: {o.status}</h5>
        <select onChange={(e) => handleStatusChange(e, o._id)}>
          <option disabled selected>
            Update Status
          </option>
          {statusValues.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div>
      <Layout
        title="Orders"
        description={`${user.name}, manage all orders `}
        className=""
      >
        <div className="row">
          <div className="col s8 offset-s2 ">
            {showOrdersLength()}
            {orders.map((o, oIndex) => {
              return (
                <div key={oIndex}>
                  <ul className="collection with-header">
                    <li className="collection-header">
                      <h5 className="home center">Order ID: {o._id} </h5>
                    </li>
                    <li className="collection-item">{showStatus(o)}</li>
                    <li className="collection-item">
                      Transaction ID : {o.transaction_id}
                    </li>
                    <li className="collection-item">Amount : Rs.{o.amount}</li>
                    <li className="collection-item">
                      Ordered by : {o.user.name}
                    </li>
                    <li className="collection-item">
                      Ordered on : {moment(o.createdAt).fromNow()}
                    </li>
                    <li className="collection-item">
                      Delivery Address : {o.address}
                    </li>
                  </ul>
                  <h4 className="totalPro">
                    Total products in the order : {o.products.length}
                  </h4>

                  {o.products.map((p, pIndex) => (
                    <div className="card  white-text hoverable">
                      <div
                        className="mb-4"
                        key={pIndex}
                        style={{
                          padding: '10px 50px',
                        }}
                      >
                        {showInput('Product Name', p.name)}
                        {showInput('Product Price', p.price)}
                        {showInput('Product Total', p.count)}
                        {showInput('Product Id', p._id)}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Orders;
