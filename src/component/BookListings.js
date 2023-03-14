/* eslint-disable*/
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../redux/book/bookReducer';
import BookComponent from './BookComponent';

const BookListing = () => {
  const dispatch = useDispatch();
  const Books = useSelector((state) => state.books);
  console.log(Books.books);

  useEffect(() => {
    if(Books.books.length === 0){
      dispatch(getBooks);
    }
  }, []);

  return (
    <div className="ui grid container">
       { Books.books.map((book) => (
          <BookComponent key={book.id} book={book} />
       ))
      }
    
    </div>
  );
};
export default BookListing;