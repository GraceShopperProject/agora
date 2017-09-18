import React from 'react';
import { Link } from 'react-router-dom';

export default function LoggedOutNavButtons() {
  return (
    <div className="navbar-nav">
      <Link to="/login" className="nav-item nav-link active">
        <button className="btn btn-outline-light">
          Login
        </button>
      </Link>
      <Link to="/signup" className="nav-item nav-link active">
        <button className="btn btn-outline-light">
          Sign Up
        </button>
      </Link>
    </div>
  );
}
