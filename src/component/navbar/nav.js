import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiPinterestFill } from 'react-icons/ri';
import {
  FaTwitter, FaFacebook, FaInstagram, FaGoogle, FaBookOpen,
} from 'react-icons/fa';
import isUserSigned from '../../helpers/auth';
import './nav.css';
import Wave from '../wave';

const Nav = () => {
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="green">
          <FaBookOpen className="fa" />
        </h1>
      </div>
      <div className="sidebar-content">
        <Wave />
        <Link to="/">
          <li>Books</li>
        </Link>
        <Link to="/reservations/new">
          <li>Reserve Books</li>
        </Link>
        <Link to="/reservations">
          <li>My Books</li>
        </Link>
        <Link to="/new-book">
          <li>Add Books</li>
        </Link>
        <Link to="/delete-book">
          <li>Delete Books</li>
        </Link>
      </div>

      {isUserSigned() && (
        <div className="relative">
          <button type="button" className="signout-buttn" onClick={signOut}>
            Sign out
          </button>
        </div>
      )}

      <div className="social-icons">
        <FaTwitter />

        <FaFacebook />

        <FaGoogle />

        <FaInstagram />

        <RiPinterestFill />
      </div>
      <span id="copyright">
        <i>&copy; Joseph, Tanusri & Nurka</i>
      </span>
    </div>
  );
};

export default Nav;
