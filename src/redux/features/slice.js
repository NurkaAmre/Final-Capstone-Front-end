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
      state.books = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export const { book } = booksSlice.actions;
export default booksSlice.reducer;
