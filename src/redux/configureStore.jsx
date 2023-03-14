import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/session-redux';

const rootReducer = combineReducers({
  users: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
