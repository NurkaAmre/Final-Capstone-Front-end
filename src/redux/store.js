import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { booksReducer } from './reducers/bookReducer';

const rootReducer = combineReducers({
  books: booksReducer,
});

const store = configureStore({
  reducer: {
    rootReducer,
  },
});

export default store;
