import React from 'react';

export default function CartegoryNav(props) {
  return (
    <nav
      className="navbar navbar-expand-lg"
    >
      <div className="container">
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
        </form>

        <ul className="nav justify-content-center">
          <li className="nav-item">
            <a className="nav-link active" href="#">Category</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Category</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Category</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">Category</a>
          </li>
        </ul>

      </div>
    </nav>
  );
}
