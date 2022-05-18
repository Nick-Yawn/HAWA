import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state => state.session?.user) 

  return (
    <nav>
      <div className="nav-bar-left nav-section">
        <Link to='/' className="navlink">
          <span className="logo">HAWA</span>
        </Link>
      </div>


      <div className="nav-bar-right nav-section">
        {!user && (
          <>
            <Link to='/sign-up' className="navlink">
              Sign Up
            </Link>
            <Link to='/login' className="navlink">
              Login
            </Link>
          </>
        )}
        {user && (
          <>
            <Link to='/projects' className="navlink">
              Projects
            </Link>
            <LogoutButton />
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
