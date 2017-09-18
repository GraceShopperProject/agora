import React from 'react';

export default function CartegoryNav (props) {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #999',
      }}
    >
      <div className="container">

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
