import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store';

function LoggedInNavButtons({ logoutOnClick }) {
  return (
    <div className="navbar-nav">
      <Link to="/account" className="nav-item nav-link">
        <button className="btn btn-outline-light">
          Account & Orders
        </button>
      </Link>
      <Link
        to="/login"
        className="nav-item nav-link active"
        onClick={logoutOnClick}
      >
        <button className="btn btn-outline-light">
          Logout
        </button>
      </Link>
    </div>
  );
}

const mapDispatch = dispatch => ({
  logoutOnClick() {
    dispatch(logout());
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(null, mapDispatch)(LoggedInNavButtons);

