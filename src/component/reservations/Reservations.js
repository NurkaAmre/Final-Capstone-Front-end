import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getReservationsThunk } from '../../redux/reservations/reservationsSlice';
/* import locationIcon from '../../img/location_icon.png';
import calendarIcon from '../../img/calendar_icon.png'; */
import { fetchBooks } from '../../redux/books/slice';
import isUserSigned from '../../helpers/auth';

const Reservations = () => {
  const { reservations } = useSelector((state) => state.reservations);
  const { books = null } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    let userId;
    if (!isUserSigned()) {
      navigate('/signin');
    } else {
    // Extract user details
      const { id } = JSON.parse(localStorage.getItem('user'));
      userId = id;
    }
    dispatch((getBooksThunk()));
    dispatch((getReservationsThunk(userId)));
  }, [dispatch, navigate]);
  const getBook = (bookId) => books.find((book) => book.id === bookId);
  return (
    <main id="resevations-page">
      <h1>Your Reservations</h1>
      <section id="resevations-list">
        {books && reservations && reservations.map((reservation) => {
          const book = getBook(reservation.book_id);
          return (
            <div key={reservation.id} className="mycard">
              <h2>
                {book.title}
                {' '}
                {book.author}
              </h2>
              <div className="mycard-footer">
                <div className="myrow">
                  <img className="myicon" src={locationIcon} alt="City name" />
                  {reservation.city}
                </div>
                <div className="myrow">
                  <img className="myicon" src={calendarIcon} alt="Date" />
                  {reservation.date}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Reservations;
