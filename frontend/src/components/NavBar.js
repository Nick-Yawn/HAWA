import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { CSSTransition } from 'react-transition-group';

import './NavBar.css'

const NavBar = ({ project }) => {
  const user = useSelector(state => state.session?.user) 

  return (
    <nav>
      <div className="nav-bar-left nav-section">
        <Link to='/' className="navlink">
          <span id="logo">HAWA</span>
        </Link>
        <div id="nav-bar-left-spacer" />
      </div>

      <CSSTransition  in={project?.title}
                      timeout={1000}
                      classNames="nav-bar-project-title">
      <div className="nav-section">
        <span id="project-title">{project?.title}</span> 
      </div>
      </CSSTransition>

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
