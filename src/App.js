// import { useState } from 'react';
import './App.css';
// import User from './components/User';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Header from './container/header';
import BookDetails from './container/BooksDetails';
import BookListing from './container/BookListings';

function App() {
  return (
    <Router>
      {/* // const [currUser, setCurrUser] = useState(null); */}
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<BookListing />} />
          <Route path="/Book/:BookId" element={<BookDetails />} />
          <Route> 404 not found </Route>
        </Routes>
        {/* <User currUser={currUser} setCurrUser={setCurrUser} /> */}
      </div>
    </Router>
  );
}
export default App;
