import React from 'react';

export default function TopNavbar (props) {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{backgroundColor: '#874C62'}}
    >
      <div className="container">
        <a
          className="navbar-brand"
          href="/"
        >
          Agora
        </a>
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
        </form>

        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="#">
            <button className="btn btn-outline-light">Login</button>
          </a>
          <a className="nav-item nav-link" href="#">
            <button className="btn btn-outline-light">Sign Up</button>
          </a>
          <a className="nav-item nav-link" href="#">
            <button className="btn btn-outline-light">Cart</button>
          </a>

        </div>

      </div>
    </nav>
  );
}
