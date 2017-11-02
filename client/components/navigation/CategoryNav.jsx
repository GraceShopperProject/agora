import React from 'react';
import { connect, } from 'react-redux';
import { Link } from 'react-router-dom';

function CategoryNav(props) {
  const categories = props.categories
  return (
    <nav className="navbar navbar-expand-lg navbar-light">

      <div className="container">
        <div className="categories">
          <ul className="nav nav-justified">
            <li className="nav-item" key="all-products">
              <Link className="nav-link" to={'/products'}>All</Link>
            </li>
            {
              categories && categories.map(category =>
                (
                  <li className="nav-item" key={category.id}>
                    <Link className="nav-link" to={`/category/${category.id}`}>{category.name}</Link>
                  </li>
                ))
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

const mapState = state => {
  return ({
    categories: state.categories,
  })
};

export default connect(mapState)(CategoryNav);

