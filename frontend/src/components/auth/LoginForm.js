import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import DemoUserPanel from './DemoUserPanel';

import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/projects' />;
  }

  return (
      <div className="login-form-and-demo-panel"> 
        <div className="flex-spacer" />
        <DemoUserPanel />
        <a href="/api/auth/github"> GITHUB OUATH</a>
        <form className="login-form" onSubmit={onLogin}>
          <div className="login-title">Login</div>
          <div className="login-errors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="form-label-and-input">
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="form-label-and-input">
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
  );
};

export default LoginForm;
