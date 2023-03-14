import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './component/user-sessions/login';
import Signup from './component/user-sessions/signup';
import BookListing from './component/BookListings';
import Nav from './component/navbar/nav';

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
        <Route path="/" element={<BookListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
