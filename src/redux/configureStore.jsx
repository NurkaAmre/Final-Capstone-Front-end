import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/session-redux';
import booksReducer from './books/slice';
import reservationsReducer from './reservations/reservationsSlice';

const rootReducer = combineReducers({
  books: booksReducer,
  users: userReducer,
  reservations: reservationsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
