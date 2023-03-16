import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import types from '../types';

const url = 'http://localhost:3000/api/v1/books';

export const fetchBooks = createAsyncThunk(
  types.FETCH_BOOKS,
  async () => {
    const response = await axios.get(url);
    return response.data;
  },
);

// Initial state
const initialState = {
  books: [],
  error: null,
  status: 'idle',
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    book(state, action) {
      const newState = state;
      newState.books = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'succeeded';
        newState.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        const newState = state;
        newState.status = 'rejected';
        newState.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;
