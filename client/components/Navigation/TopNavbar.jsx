import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import {
  LoggedInNavButtons,
  LoggedOutNavButtons,
  AdminLoggedInNavButtons,
} from '../Navigation';

function TopNavbar ({children, isLoggedIn, isAdmin, }) {

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: '#874C62' }}
    >
      <div className="container">
        <Link
          className="navbar-brand"
          to="/"
        >
          Agora
        </Link>
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

          {isLoggedIn
            ?   isAdmin
                  ?  <AdminLoggedInNavButtons />
                  : <LoggedInNavButtons />
            : <LoggedOutNavButtons />
          }

          <Link to="/shoppingcart" className="nav-item nav-link">
            <button className="btn btn-outline-light">
              Cart
            </button>
          </Link>

        </div>

      </div>
    </nav>
  );
}

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.user.id,
  isAdmin :  state.user.is_admin
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, null)(TopNavbar));

