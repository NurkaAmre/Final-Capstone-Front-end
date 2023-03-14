/* eslint-disable*/
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../redux/book/bookReducer';
import BookComponent from './BookComponent';

const BookListing = () => {
  const dispatch = useDispatch();
  const Books = useSelector((state) => state);
  console.log(Books.lenght);

  useEffect(() => {
    const fetching = async() => {
      const res = await fetch('http://localhost:3000/api/v1/books');
      const allBooks = res.json();
      console.log(allBooks);
    }
    fetching();
    // dispatch(getBooks);
  });

  return (
    <div className="ui grid container">

      {
      Books.rootReducer.books.length !== 0 ? (
      <h1>No books available</h1>
      ) : (
        // Books.rootReducer.books.map((book) => (
        //   <BookComponent key={book.id} book={book} />
        // ))
        <h2>Mayday.....</h2>
      )
     }
    
    </div>
  );
};
export default BookListing;
