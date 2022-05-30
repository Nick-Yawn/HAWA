import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(name, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(["Passwords must match"])
    }
  };

  const updateName = (e) => setName(e.target.value);

  const updateEmail = (e) => setEmail(e.target.value);

  const updatePassword = (e) => setPassword(e.target.value);

  const updateRepeatPassword = (e) => setRepeatPassword(e.target.value);

  if (user) {
    return <Redirect to='/projects' />;
  }

  return (
      <div className="signup-form-and-demo-panel">
        <form className="signup-form" onSubmit={onSignUp}>
          <div className="signup-form-title">Sign Up</div>
          <div className="signup-errors">
            {errors.map((error, ind) => (
              <span className="signup-error" key={ind}>{error}</span>
            ))}
          </div>
          <div className="form-label-and-input">
            <label>Name</label>
            <input
              type='text'
              name='name'
              onChange={updateName}
              value={name}
            ></input>
          </div>
          <div className="form-label-and-input">
            <label>Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className="form-label-and-input">
            <label>Password</label>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              required={true}
            ></input>
          </div>
          <div className="form-label-and-input">
            <label>Repeat Password</label>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type='submit'>Sign Up</button>
        </form>
      </div>
  );
};

export default SignUpForm;
