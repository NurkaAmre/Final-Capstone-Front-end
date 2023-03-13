import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userSession } from '../../redux/user/session-redux';

const Login = () => {
  const dispatch = useDispatch();

  const redirection = useNavigate();

  const userData = useSelector((state) => state.users);

  const [usernameState, setUsernameState] = useState('');
  const [existState, setExistState] = useState(false);
  const [clicked, setClickedState] = useState(false);
  const [validDisplayState, setValidDisplayState] = useState(false);

  const userDispatch = () => {
    setClickedState(true);
    if (usernameState.length === 0) {
      setValidDisplayState(true);
      setExistState(false);
    } else {
      dispatch(userSession({ user_name: usernameState }, 'login'));
    }
  };

  const setUsername = (e) => {
    setUsernameState(e.target.value);
  };

  useEffect(() => {
    if (userData.logged_in === false) {
      if (clicked) {
        setExistState(true);
        setValidDisplayState(false);
      }
    }
    if (userData.logged_in === true) {
      setExistState(false);
      localStorage.setItem('logged_in', true);
      localStorage.setItem('user', userData.user.user_name);
    }
    if (localStorage.getItem('logged_in') === 'true') {
      const user = localStorage.getItem('user');
      if (!userData) {
        dispatch(userSession({ user_name: user }, 'login'));
      }
      redirection('/');
    }
  }, [userData.message, userData.logged_in, redirection, dispatch, userData, clicked]);

  return (
    <section className="user-page flex">
      <div>
        <h1>Welcome Back</h1>
      </div>
      <form action="" className="user-form flex">
        <input
          type="input"
          name="user_name"
          placeholder="Username"
          id="user_name"
          onChange={setUsername}
          required
        />
        <div
          className="error"
          style={{
            display: existState ? 'inherit' : 'none',
          }}
        >
          <p>{userData ? userData.message : 'Something went wrong'}</p>
        </div>
        <div
          className="error"
          style={{
            display: validDisplayState ? 'inherit' : 'none',
          }}
        >
          <p>Username field can not be empty</p>
        </div>
        <button
          type="button"
          name="login"
          className="session-btn"
          onClick={userDispatch}
        >
          Log In
        </button>
        <Link to="/user/signup">
          <p
            className="session-redirect"
          >
            <em>Not a member? Sign up...</em>
          </p>
        </Link>
      </form>
    </section>
  );
};

export default Login;
