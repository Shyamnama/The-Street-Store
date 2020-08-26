import React from 'react';
import 'materialize-css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
//Admin components
import AddCategory from './components/admin/AddCategory';
import AddProduct from './components/admin/AddProduct';
import Orders from './components/admin/Orders';
import ManageProducts from './components/admin/ManageProducts';
import UpdateCategory from './components/admin/UpdateCategory';
import UpdateProduct from './components/admin/UpdateProduct';
//User components
import AdminDashboard from './components/user/AdminDashboard';
import Dashboard from './components/user/UserDashboard';
import Profile from './components/user/Profile';
import Signin from './components/user/Signin';
import Signup from './components/user/Signup';
//Authorized routes
import AdminRoute from './components/auth/AdminRoute';
import PrivateRoute from './components/auth/PrivateRoute';
//Core components
import Cart from './components/core/Cart/Cart';
import Home from './components/core/Home/Home';
import Product from './components/core/Product/Product';
import Shop from './components/core/Product/Shop';


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
