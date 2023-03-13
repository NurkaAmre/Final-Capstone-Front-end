import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import isUserSigned from '../../helpers/auth';
import './nav.css';

const Navigation = () => {
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Pics</h1>
      </div>
      <div className="sidebar-content">
        <Link to="/"><li>Books</li></Link>
        <Link to="/reservations/new"><li>Reserve Books</li></Link>
        <Link to="/reservations"><li>My Books</li></Link>
        <Link to="/new-car"><li>Add Books</li></Link>
        <Link to="/delete-car"><li>Delete Books</li></Link>
      </div>
      {isUserSigned() && (
        <div className="signout-buttn"><button type="button" onClick={signOut}>Sign out</button></div>
      )}
      {/* <div className="social-icons">

        <FaTwitter />

        <FaFacebook />

        <FaGoogle />

        <FaInstagram />

        <RiPinterestFill />

      </div> */}
      <span id="copyright"><i>&copy; Joseph, Tanusri & Nurka</i></span>
    </div>
  );
};

export default Navigation;
