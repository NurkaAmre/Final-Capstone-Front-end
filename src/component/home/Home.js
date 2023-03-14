import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import Carousel from 'react-bootstrap/Carousel';
import { v4 as uuidv4 } from 'uuid';
import { fetchBooks } from '../../redux/books/slice';
import './home.css';
// import isUserSigned from '../../helpers/auth';
import Navigation from '../navbar/nav';

const Main = () => (
  <>
    <section>
      <Navigation />
      <header>
        <h1 className="app-title">Latest i-Model Cars</h1>
        <p className="app-msg">Please select an i-model</p>
      </header>
    </section>

    <Carousel className="cars-container" interval={null}>

      {books && books.reduce((acc, book, index) => {
        if (index % carouselIndex === 0) {
          acc.push([]);
        }

        if (acc[acc.length - 1]) {
          acc[acc.length - 1].push(car);
        }

        return acc;
      }, []).map((bookGroup) => (

        <Carousel.Item key={uuidv4()} className="cars">

          <div className="d-flex">

            {bookGroup.map((car) => (

              <div>

                <Link to={`/details/${book.id}`}>

                  <img
                    src={book.images[Object.keys(book.images)[0]]}
                    alt={book.name}
                    style={{ height: '200px', width: '300px' }}
                  />
                </Link>

                <div className="car-info">
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

  </>
);

export default Main;
