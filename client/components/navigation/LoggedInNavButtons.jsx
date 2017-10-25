import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { logout } from '../../store';
import history from '../../history';

function LoggedInNavButtons({ isAdmin, logoutOnClick }) {
  return (
    <NavDropdown
      title="My Account"
      id="account-dropdown"
      eventKey={'account-dropdown'}
    >
      {isAdmin && (
        <MenuItem header>Admin</MenuItem>
      )}
      {isAdmin && (
        <MenuItem onClick={() => history.push('/admin-users')}>
            Manage Users
        </MenuItem>
      )}
      {isAdmin && (
        <MenuItem onClick={() => history.push('/admin-products')}>
            Manage Products
        </MenuItem>
      )}
      {isAdmin && (
        <MenuItem divider />
      )}

      <MenuItem onClick={() => history.push('/account')}>
        Account Settings
      </MenuItem>

      <MenuItem onClick={() => history.push('/orders')}>
         Orders & Reviews
      </MenuItem>

      <MenuItem divider />

      <MenuItem onClick={logoutOnClick}>
        Sign Out
      </MenuItem>

    </NavDropdown>
  );
}

const mapDispatch = dispatch => ({
  logoutOnClick() {
    dispatch(logout());
    history.push('/login');
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(null, mapDispatch)(LoggedInNavButtons);

