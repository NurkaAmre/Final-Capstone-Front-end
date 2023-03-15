import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from './component/home/Home';
import Login from './Forms/Login';
import SignUpForm from './component/signup/SignUp';
import Details from './component/details/Details';
import NewReservationForm from './component/reservations/NewReservationForm';
import Reservations from './component/reservations/Reservations';
import store from './redux/configureStore';
import Navigation from './component/navbar/nav';
import './App.css';
import AddBook from './component/addBook/AddBook';
import RemoveBook from './component/deleteBook/RemoveBook';

const App = () => {
  <Provider store={store}>
    <Navigation />
    <Routes>
      <Route path="" element={<Main />} />
      <Route path="/new-book" element={<AddBook />} />
      <Route path="details/:id" element={<Details />} />
      <Route path="/delete-book" element={<RemoveBook />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/reservations/new:bookId" element={<NewReservationForm />} />
      <Route path="/reservations/new" element={<NewReservationForm />} />
    </Routes>
  </Provider>;
};

export default App;
