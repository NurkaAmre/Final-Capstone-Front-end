/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL } from '../../helpers/api';

export const getBooksThunk = createAsyncThunk('books/getBooks', async () => {
  const response = await fetch(`${baseURL}/books`);
  const data = await response.json();
  return data;
});

const booksSlice = createSlice({
  name: 'books',
  initialState: { books: null, status: 'idle' },
  extraReducers: (builder) => {
    builder.addCase(getBooksThunk.fulfilled, (state, action) => {
      state.status = 'succeded';
      state.books = action.payload;
    });
  },
});

export const selectAllBooks = (state) => state.books.books;

export default booksSlice.reducer;
