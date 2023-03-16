import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import Carousel from 'react-bootstrap/Carousel';
/* eslint-disable import/no-extraneous-dependencies */
import { v4 as uuidv4 } from 'uuid';
import { getBooksThunk } from '../../redux/books/slice';
import './home.css';
import isUserSigned from '../../helpers/auth';

const Main = () => {
  const dispatch = useDispatch();
  const { books = null, status = 'idle' } = useSelector((state) => state.books);
  // Fetch data from the localhost api
  const navigate = useNavigate();
  const [carouselIndex, setcarouselIndex] = useState(0);
  useEffect(() => {
    if (!isUserSigned()) {
      navigate('/signin');
    }
    if (window.innerWidth <= 768) {
      setcarouselIndex(1);
    } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
      setcarouselIndex(2);
    } else {
      setcarouselIndex(3);
    }
    if (status === 'idle') {
      dispatch(getBooksThunk());
    }
  }, [status, dispatch, navigate]);

  return (
    <section>
      <header>
        <h1 className="title">Books</h1>
        <p className="instruction">Please select a book</p>
      </header>

      <Carousel className="books-card" interval={null}>
        {books
          && books
            .reduce((acc, book, index) => {
              if (index % carouselIndex === 0) {
                acc.push([]);
              }
              if (acc[acc.length - 1]) {
                acc[acc.length - 1].push(book);
              }
              return acc;
            }, [])
            .map((bookGroup) => (
              <Carousel.Item key={uuidv4()} className="books">
                <div className="d-flex">
                  {bookGroup.map((book) => (
                    <div key={book.id}>
                      <Link to={`/details/${book.id}`}>
                        {/* <img
                          src={book.book_cover_images}
                          alt={book.title}
                          style={{ height: "200px", width: "300px" }}
                        /> */}
                      </Link>
                      <div className="book-detail">
                        <h4>{book.title}</h4>
                        <span>{book.author}</span>
                      </div>
                      <div className="icons">
                        <div className="icon-img">
                          <FaTwitter />
                        </div>

                        <div className="icon-img">
                          <FaFacebook />
                        </div>

                        <div className="icon-img">
                          <FaInstagram />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            ))}
      </Carousel>
    </section>
  );
};

export default Main;
