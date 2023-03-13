import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import booksReducer from './book/bookReducer';
import userReducer from './user/session-redux';

const rootReducer = combineReducers({
  books: booksReducer,
  users: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
}, applyMiddleware(thunk));

export default store;