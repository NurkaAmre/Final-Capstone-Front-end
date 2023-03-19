import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FaTwitter, FaFacebook, FaInstagram, FaCat,
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
/* eslint-disable import/no-extraneous-dependencies */
import { v4 as uuidv4 } from 'uuid';
import { getBooksThunk } from '../../redux/books/slice';
import './home.css';
import isUserSigned from '../../helpers/auth';
import Navigation from '../navbar/nav';


const Main = () => {
  const dispatch = useDispatch();
  const { books = null } = useSelector((state) => state.books);
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
    dispatch(getBooksThunk());
  }, [dispatch, navigate]);

  const titleAnim = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 2 } },
  };
  return (
    <section className="root">
      <Navigation />
      <header>
        <motion.h1 variants={titleAnim} className="app-title">
          Read with Splat
          <FaCat />
        </motion.h1>
        <p className="app-msg">
          Borrow ebooks, audiobooks, magazines, and more from your local library
          for free!
          <br /> Libby is the newer library reading app by OverDrive, loved by
          millions of readers worldwide.
        </p>
        <Carousel className="books-container" interval={null}>
          {books &&
            books
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
                          <img
                            src={
                              book.book_cover_images[
                                Object.keys(book.book_cover_images)[0]
                              ]
                            }
                            alt={book.title}
                            style={{ height: '200px', width: '200px' }}
                          />
                        </Link>
                        <div className="book-info">
                          <h4>{book.title}</h4>
                          <span>
                            {' '}
                            By:
                            {book.author}
                          </span>
                        </div>
                        <div className="link-us">
                          <div className="icon">
                            <FaTwitter />
                          </div>

                          <div className="icon">
                            <FaFacebook />
                          </div>

                          <div className="icon">
                            <FaInstagram />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
        </Carousel>
      </header>
    </section>
  );
};

export default Main;
