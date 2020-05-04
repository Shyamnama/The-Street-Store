import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout/Layout';
import { signup } from '../auth';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true,
        });
      }
    });
  };

  const signUpForm = () => {
    return (
      <div className="valign-wrapper row login-box">
        <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
          <form>
            <div className="card-content">
              <div className="row">
                <h4 className=" signClass">Sign Up</h4>
                <div className="input-field col s12">
                  <i className="material-icons prefix blue-text text-lighten-3">
                    account_circle
                  </i>
                  <label htmlFor="name">Name</label>
                  <input
                    onChange={handleChange('name')}
                    id="name"
                    autoComplete="off"
                    type="text"
                    value={name}
                    className="grey-text text-lighten-3"
                  />
                </div>
                <div className="input-field col s12">
                  <i className="material-icons prefix blue-text text-lighten-3">
                    email
                  </i>
                  <label htmlFor="email"> Email </label>
                  <input
                    onChange={handleChange('email')}
                    type="email"
                    className="validate grey-text text-lighten-3"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="input-field col s12">
                  <i className="material-icons prefix blue-text text-lighten-3">
                    lock
                  </i>
                  <label htmlFor="password">Password </label>
                  <input
                    onChange={handleChange('password')}
                    type="password"
                    className="validate grey-text text-lighten-3"
                    name="password"
                    id="password"
                  />
                </div>
              </div>
            </div>
            <div className=" center">
              <button
                type="submit"
                className="btn cyan darken-2 mb-4 "
                onClick={clickSubmit}
              >
                Sign up
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

  const showSuccess = () => {
    return (
      <div className="alert-info" style={{ display: success ? '' : 'none' }}>
        New account is created. please <Link to="/signin">Signin</Link>
      </div>
    );
  };

  return (
    <div>
      <Layout title="Sign up" description="Signup to The Street Store">
        {showError()}
        {showSuccess()}
        {signUpForm()}
      </Layout>
    </div>
  );
};

export default Signup;
