import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './component/user-sessions/login';
import Signup from './component/user-sessions/signup';
import BookListing from './component/BookListings';
import Navigation from './component/navbar/nav';

const App = () => {
  return (
    <BrowserRouter>
    <Navigation />
      <Routes>
        <Route path="/" element={<BookListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
