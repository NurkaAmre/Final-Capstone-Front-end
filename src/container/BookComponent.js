/* eslint-disable */
import React from 'react';

const BookComponent = ({ book }) => (
  <div className="header">
    <div>{book.title}</div>
    <h3>{book.category}</h3>
  </div>
);

export default BookComponent;
