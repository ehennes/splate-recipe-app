import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Nav = ({ isAuthenticated, onlogout}) => {
return(
  <nav>
    <div className="navbar">
      <h1 className="logo">Splate</h1>
      <ul className="navbar-links">
        <li><Link to='/'>Home</Link></li>
          {isAuthenticated ? (<li><button className="linklike" onClick={e => onlogout()}>Log Out</button></li>)
            :
            (<li><Link to='/login'>Log In</Link></li>)
          }
        <li><Link to='/lists/grocery-list'>My Lists</Link></li>
      </ul>
    </div>
  </nav>
)
}

export default Nav;
