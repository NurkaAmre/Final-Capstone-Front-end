import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/user/session-redux';
import { baseURL } from '../helpers/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const isUserLogged = () => {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    if (user !== null) {
      window.location.href = '/';
    }
  };

  useEffect(isUserLogged, []);

  const isUserExistInApi = async (username) => fetch(`${baseURL}/users/${username}`)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return false;
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    isUserExistInApi(username).then((data) => {
      if (data === false) {
        window.location.href = '/signup';
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        dispatch(loginUser({ data: username, isLogged: true }));
        window.location.href = '/';
      }
    });
  };

  return (
    <section className="hero-log">
      <form onSubmit={handleSubmit} className="hero-form">
        <h1>Log in</h1>
        <label htmlFor="username">
          <input
            type="text"
            id="username"
            placeholder="Enter your name"
            value={username}
            onChange={handleChangeUsername}
          />
        </label>
        <br />
        <label htmlFor="Email">
          <input
            type="email"
            id="Email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChangeEmail}
          />
        </label>
        <br />
        <button type="submit" className="submit-btn">
          Login
        </button>
        <br />
        <span>
          <i>Don&apos;t have an account?</i>
        </span>
        <Link to="/signup">Sign up here</Link>
      </form>
      <div className="hero-images" />
    </section>
  );
};

export default Login;
