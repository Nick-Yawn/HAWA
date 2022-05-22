import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { clearProjects } from '../../store/projects';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    dispatch(clearProjects());
  };
  
  const handleKeyDown = e =>{
    if(e.key === "Enter"){
      onLogout();
    }
  }

  return <a className="navlink" tabIndex="0" onKeyDown={handleKeyDown} onClick={onLogout}>Logout</a>;
};

export default LogoutButton;
