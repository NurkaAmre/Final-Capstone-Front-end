import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userSession } from './redux/user/session-redux';
import Login from './component/user-sessions/login';
import Signup from './component/user-sessions/signup';
import Nav from './component/nav';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchBooks());
    if (localStorage.getItem('user')) {
      const userName = localStorage.getItem('user');
      dispatch(userSession({ userName }, 'login'));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
