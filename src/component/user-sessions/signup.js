import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userSession } from '../../redux/user/session-redux';

const Signup = () => {
  const dispatch = useDispatch();

  const redirection = useNavigate();

  const userData = useSelector((state) => state.users);

  const [usernameState, setUsernameState] = useState('');
  const [existState, setExistState] = useState(false);
  const [validMsgState, setValidMsgState] = useState('');
  const [clicked, setClickedState] = useState(false);
  const [validDisplayState, setValidDisplayState] = useState(false);

  const validate = () => {
    setClickedState(true);
    if (usernameState.length === 0) {
      setValidMsgState('Username field can not be empty');
      setValidDisplayState(true);
      setExistState(false);
    } else if (usernameState.length < 6) {
      setValidMsgState('Username must be at least 6 characters');
      setValidDisplayState(true);
      setExistState(false);
    } else if (usernameState.length >= 6) {
      dispatch(userSession({ user_name: usernameState }, 'signup'));
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
        <h1>Get Started</h1>
      </div>
      <form action="" className="user-form flex">
        <input
          type="input"
          name="user_name"
          placeholder="Username"
          id="user_name"
          onChange={setUsername}
        />
        <div
          className="backend-error"
          style={{
            display: existState ? 'inherit' : 'none',
          }}
        >
          <p>{userData.message}</p>
        </div>
        <div
          className="error"
          style={{
            display: validDisplayState ? 'inherit' : 'none',
          }}
        >
          <p>{validMsgState}</p>
        </div>
        <button
          type="button"
          name="signup"
          className="session-btn"
          onClick={validate}
        >
          Sign Up
        </button>
        <Link to="/user/login">
          <p
            className="session-redirect"
          >
            <em>Already a member? Log in...</em>
          </p>
        </Link>
      </form>
    </section>
  );
};

export default Signup;
