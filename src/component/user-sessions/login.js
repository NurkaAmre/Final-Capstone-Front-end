import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { loginUser } from '../../redux/user/session-redux';
import { baseURL } from '../../helpers/api';
import './login.css';

'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
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
        navigate('/');
        console.log('hi');
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        dispatch(loginUser({ data: username, isLogged: true }));
        navigate('/');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Log in</h1>
      <label htmlFor="username">
        <p>Name:</p>
        <input type="text" id="username" value={username} onChange={handleChangeUsername} />
      </label>
      <br />
      <button type="submit" className="submit-btn">Login</button>
      <br />
      <span><i>Don&apos;t have an account?</i></span>
      <Link to="/signup">Sign up here</Link>
    </form>
  );
};

export default Login;
