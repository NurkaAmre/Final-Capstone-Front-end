import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './component/user-sessions/login';
import Signup from './component/user-sessions/signup';
import Nav from './component/nav';

const App = () => (
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);

export default App;
