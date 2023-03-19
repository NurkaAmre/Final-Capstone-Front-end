import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createReservationAPI } from '../../helpers/api';
import isUserSigned from '../../helpers/auth';
import { getBooksThunk } from '../../redux/books/slice';
import Nav from '../navbar/nav';

const NewReservationForm = () => {
  // eslint-disable-next-line react/prop-types, no-unused-vars
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Authenticate the user
  useEffect(() => {
    if (!isUserSigned()) {
      navigate('/signin');
    }
    dispatch(getBooksThunk());
  }, [dispatch, navigate]);

  const { books = null } = useSelector((state) => state.books);

  // Extract the book id from the URL
  const { bookId } = useParams();

  // Set initial fields values
  const [reservation, setReservation] = useState({
    book_id: bookId || 0,
    date_of_booking: '',
    date_of_delivery: '',
    city: '',
  });

  // Set message
  const [msg, setMsg] = useState({
    type: '',
    text: '',
  });

  // Send the reservation details to the API
  const handleSubmit = (e) => {
    e.preventDefault();
    // Extract user details
    const { id: userId } = JSON.parse(localStorage.getItem('user'));
    createReservationAPI(userId, reservation)
      .then((response) => {
        if (response.status === 200) {
          setMsg({ type: 'msg-sucss', text: 'The Book has been ordered' });
        } else {
          setMsg({ type: 'msg-fail', text: 'Something went wrong!' });
        }
      });
  };

  // Update the state after each change in the fields values
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };
  return (
    <section className="reserv-root">
      <Nav />
      <div id="reservation-page">
        <h1>BOOK A BOOK FROM OUR LIBRARY</h1>
        <form className="reserve-form">
          <label htmlFor="selectbook">
            Select your book:
            <select
              name="book_id"
              className="select-option"
              value={bookId}
              onChange={handleFieldChange}
            >
              {books
                && books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="datebook">
            Date of Booking:
            <input
              type="date"
              name="date_of_booking"
              placeholder="date"
              value={reservation.date_of_booking}
              onChange={handleFieldChange}
            />
          </label>
          <label htmlFor="datedelivery">
            Date of delivery:
            <input
              type="date"
              name="date_of_delivery"
              placeholder="date"
              value={reservation.date_of_delivery}
              onChange={handleFieldChange}
            />
          </label>
          <label htmlFor="city">
            Enter your city:
            <input
              type="text"
              name="city"
              value={reservation.city}
              onChange={handleFieldChange}
            />
          </label>
          <input
            className="buttn"
            type="submit"
            value="Order Now"
            onClick={handleSubmit}
          />
        </form>
        <span className={msg.type}>{msg.text}</span>
      </div>
    </section>
  );
};

export default NewReservationForm;
