import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from './modules/Home';
import { userSession } from './redux/user/session-redux';
import Login from './modules/user-sessions/login';
import Signup from './modules/user-sessions/signup';
import Nav from './modules/Nav';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooks());
    if (localStorage.getItem('user')) {
      const user_name = localStorage.getItem('user');
      dispatch(userSession({ user_name }, 'login'));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
