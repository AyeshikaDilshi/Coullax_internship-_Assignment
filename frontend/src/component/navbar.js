import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Book Reviews</h1>
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/reviews" className="navbar-link">View Reviews</Link>
          </li>
          <li>
            <Link to="/add" className="navbar-link">Add Review</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
