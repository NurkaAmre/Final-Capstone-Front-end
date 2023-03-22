import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signUpUser } from '../../redux/user/session-redux';
import { baseURL } from '../../helpers/api';
import './SignUp.css';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const createUserAPI = async (username, email) => fetch(`${baseURL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_name: username, email }),
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    return false;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    createUserAPI(username, email).then((userdata) => {
      if (userdata !== false) {
        dispatch(signUpUser({ data: userdata, isLogged: true }));
        localStorage.setItem('user', JSON.stringify(userdata));
        navigate('/');
      }
    });
  };

  return (
    <section className="hero-sign-up">
      <div className="hero-image" />
      <form onSubmit={handleSubmit} className="hero-form-sign-up">
        <label htmlFor="username" className="label-username">
          Enter your name:
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <br />
        <label htmlFor="email" className="label-username">
          Enter your email:
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <br />
        <button type="submit" className="submit-btn">
          Sign up
        </button>
        <br />
        <span><i>Already have an account?</i></span>
        <Link to="/signin"> Log in here</Link>
      </form>
    </section>
  );
};

export default SignUpForm;
