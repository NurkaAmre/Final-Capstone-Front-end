import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import Carousel from 'react-bootstrap/Carousel';
import { v4 as uuidv4 } from 'uuid';
import { fetchBooks } from '../../redux/books/slice';
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
      dispatch(fetchBooks());
    }
  }, [status, dispatch, navigate]);

  return (
    <section>
      <header>
        <h1 className="app-title">Books</h1>
        <p className="app-msg">Please select a book</p>
      </header>

      <Carousel className="books-container" interval={null}>
        {books && books.reduce((acc, book, index) => {
          if (index % carouselIndex === 0) {
            acc.push([]);
          }
          if (acc[acc.length - 1]) {
            acc[acc.length - 1].push(book);
          }
          return acc;
        }, []).map((bookGroup) => (
          <Carousel.Item key={uuidv4()} className="books">
            <div className="d-flex">
              {bookGroup.map((book) => (
                <div key={book.id}>
                  <Link to={`/details/${book.id}`}>
                    <img src={book.images[Object.keys(book.images)[0]]} alt={book.name} style={{ height: '200px', width: '300px' }} />
                  </Link>
                  <div className="book-info">
                    <h4>{book.name}</h4>
                    <span>{book.description.split('', 50)}</span>
                  </div>
                  <div className="social-icon">
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
    </section>

  );
};

export default Main;
