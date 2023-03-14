import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user/session-redux';
import booksReducer from './features/slice';

const rootReducer = combineReducers({
  books: booksReducer,
  users: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
}, applyMiddleware(thunk));

export default store;
