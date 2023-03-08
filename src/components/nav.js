import { Link } from 'react-router-dom';

const Nav = () => (
  <header>
    <nav>
      <Link exact to="/">Books </Link>
      <Link to="/MyReservation">My Reservation</Link>
    </nav>
  </header>
);

export default Nav;
