import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout/Layout';
import { isAuthenticate } from '../auth';
import { read, update, updateUser } from './apiUser';
import { Redirect } from 'react-router-dom';

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    success: false,
  });

  const { token } = isAuthenticate();
  const { name, email, password, success } = values;

  const init = (userId) => {
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
    // eslint-disable-next-line
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          alert(data.error);
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />;
    }
  };

  const profileUpdate = (name, email, password) => {
    return (
      <form className="col s6 offset-s3">
        <label>Name</label>
        <input
          placeholder=""
          type="text"
          onChange={handleChange('name')}
          value={name}
        />

        <label>Email</label>
        <input
          placeholder=""
          type="text"
          onChange={handleChange('email')}
          value={email}
        />

        <label>Password</label>
        <input
          placeholder=""
          type="password"
          onChange={handleChange('password')}
          value={password}
        />

        <button onClick={clickSubmit} className="btn">
          Submit
        </button>
      </form>
    );
  };

  return (
    <div>
      <Layout
        title="Profile"
        description="Update Your Profile"
        className="container"
      >
        <h5 className="mt mb center">Profile Update</h5>
        {profileUpdate(name, email, password)}
        {redirectUser(success)}
      </Layout>
    </div>
  );
};

export default Profile;
