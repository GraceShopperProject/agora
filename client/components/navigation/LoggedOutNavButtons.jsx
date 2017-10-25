import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import history from '../../history';

export default function LoggedOutNavButtons() {
  return (
    <NavItem>
      <NavItem onClick={() => history.push('/signup')}>Sign Up</NavItem>
      <NavItem onClick={() => history.push('/login')}>Log In</NavItem>
    </NavItem>

    // {/* <div className="navbar-nav">
    //   <Link to="/login" className="nav-item nav-link active">
    //     <button className="btn btn-outline-light">
    //       Login
    //     </button>
    //   </Link>
    //   <Link to="/signup" className="nav-item nav-link active">
    //     <button className="btn btn-outline-light">
    //       Sign Up
    //     </button>
    //   </Link>
    // </div> */}
  );
}
