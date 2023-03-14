import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
/* import Login from './component/user-sessions/login';
import Signup from './component/user-sessions/signup';
import BookListing from './component/BookListings';
import Navigation from './component/navbar/nav'; */
import Main from './component/home/Home';

const App = () => (

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  </BrowserRouter>

);

export default App;
