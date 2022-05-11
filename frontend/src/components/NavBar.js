
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
      <NavLink to='/' exact={true} activeClassName='active'>
        Home
      </NavLink>
      <NavLink to='/login' exact={true} activeClassName='active'>
        Login
      </NavLink>
      <NavLink to='/sign-up' exact={true} activeClassName='active'>
        Sign Up
      </NavLink>
      <NavLink to='/projects' exact={true} activeClassName='active'>
        Projects
      </NavLink>
      <LogoutButton />
    </nav>
  );
}

export default NavBar;
