import { configureStore, combineReducers } from '@reduxjs/toolkit';
import booksReducer from './books/books';
import userReducer from './user/session-redux';

const rootReducer = combineReducers({
  books: booksReducer,
  users: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;