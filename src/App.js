import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './component/user-sessions/login';
import Signup from './component/user-sessions/signup';
import Home from './component/home/Home'
import Navigation from './component/navbar/nav';

const App = () => (
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);

export default App;
