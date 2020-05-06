import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout/Layout';
import { signin, authenticate, isAuthenticate } from '../auth';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signInForm = () => {
    return (
      <div className="valign-wrapper row login-box">
        <div className="col s10 pull-s1 m6 pull-m3 l4 pull-l4 z-depth-3">
          <form>
            <div className="card-content">
              <div className="row">
                <h4 className=" signClass">Sign in</h4>
                <div className="input-field col s12 signinInput">
                  <i className="material-icons prefix blue-text text-darken-2">
                    email
                  </i>
                  <label htmlFor="email"> Email </label>
                  <input
                    onChange={handleChange('email')}
                    type="email"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="input-field col s12 signinInput">
                  <i className="material-icons prefix blue-text text-darken-2">
                    lock
                  </i>
                  <label htmlFor="password">Password </label>
                  <input
                    onChange={handleChange('password')}
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
              </div>
            </div>
            <div className=" center">
              <button
                type="submit"
                className="btn blue darken-2 mb-4  "
                onClick={clickSubmit}
              >
                Log in
              </button>
            </div>
          </form>
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

  const showLoading = () => {
    return (
      loading && (
        <div className="center">
          <div className="preloader-wrapper small active ">
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left">
                <div className="circle "></div>
              </div>
              <div className="gap-patch">
                <div className="circle "></div>
              </div>
              <div className="circle-clipper center">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect exact to="/admin/dashboard" />;
      } else {
        return <Redirect exact to="/user/dashboard" />;
      }
    }
    if (isAuthenticate()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <div>
      <Layout title="Sign in" description="Signin to The Street Store">
        {showLoading()}
        {showError()}
        {signInForm()}
        {redirectUser()}
      </Layout>
    </div>
  );
};

export default Signin;
