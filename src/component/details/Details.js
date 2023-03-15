import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiOutLineSetting } from 'react-icons/ai';
import { TfiArrowCircleRight } from 'react-icons/tfi';
import { BiLeftArrow } from 'react-icons/bi';
import './Details.css';
import { baseURL } from '../../helpers/api';

const Details = () => {

    const { id } = useParams();

    const [bookDetails, setBookDetails] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookDetails = async () => {
          try {
            const response = await axios.get(`${baseURL}/books/${id}`);
            setBookDetails(response.data);
            return response;
          } catch (error) {
            return error;
          }
        };
    
        fetchBookDetails();
      }, [id]);

      const navigateHome = () => {
        navigate('/');
      };

      return (
        <section>
          {bookDetails && (
            <div key={bookDetails.id} className="card">
              <div className="books-image">
                <img
                  src={bookDetails.images[Object.keys(bookDetails.images)[0]]}
                  alt={bookDetails.name}
                />
                <p className="books-description">{bookDetails.description}</p>
                <div className="configure">
                  <button type="button" onClick={navgiateHome}>
                    <BiLeftArrow />
                  </button>
                </div>
              </div>
              <div className="book-props">
                <div className="books-name">
                  <h3>{bookDetails.name}</h3>
                  <span>
                    <i>
                      $-
                      {bookDetails.cost}
                      {' '}
                      upon reservations!
                    </i>
                  </span>
                </div>
                <div className="books-genre">
                  <span>
                    Genre:
                    {' '}
                    {bookDetails.genre}
                  </span>
                </div>
                <div className="books-type">
                  <span>
                    Type:
                    {' '}
                    {bookDetails.book_type}
                  </span>
                </div>
                <div className="books-cost">
                  <span>
                    Cost:
                    {' '}
                    {bookDetails.cost}
                  </span>
                </div>
                <div className="books-speed">
                  <span>
                    Pages:
                    {' '}
                    {bookDetails.pages}
                  </span>
                </div>
                <div className="books-color">
                  <span>
                    Color:
                    {' '}
                    {bookDetails.color}
                  </span>
                </div>
                <Link to={`/reservations/new/${bookDetails.id}`} className="configure">
                  <button type="button">
                    <AiOutlineSetting />
                    <span>Reserve</span>
                    <TfiArrowCircleRight />
                  </button>
                </Link>
              </div>
            </div>
          )}
        </section>
      );
    };
    
    export default Details;
