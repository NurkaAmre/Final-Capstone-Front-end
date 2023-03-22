import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { AnimatePresence } from 'framer-motion';
import Main from './component/home/Home';
import Login from './Forms/Login';
import SignUpForm from './component/signup/SignUp';
import Details from './component/details/Details';
import NewReservationForm from './component/reservations/NewReservationForm';
import Reservations from './component/reservations/Reservations';
import reservationReducer from './redux/reservations/reservationsSlice';
import booksReducer from './redux/books/slice';
import './App.css';
import AddBook from './component/addBook/AddBook';
import RemoveBook from './component/deleteBook/RemoveBook';

const store = configureStore({
  reducer: {
    reservations: reservationReducer,
    books: booksReducer,
  },
});

const App = () => (
  <Provider store={store}>
    <AnimatePresence>
      <Routes>
        <Route path="" element={<Main />} />
        <Route path="/new-book" element={<AddBook />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="/delete-book" element={<RemoveBook />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route
          path="/reservations/new/:bookId"
          element={<NewReservationForm />}
        />
        <Route path="/reservations/new" element={<NewReservationForm />} />
      </Routes>
    </AnimatePresence>
  </Provider>
);

export default App;
