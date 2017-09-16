import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logout } from '../store';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn } = props;

  return (
    <div>
      <h1>Agora</h1>
      <nav>
        <div className="container">
          {
            isLoggedIn
              ? <div id="nav-items" className="collapse navbar-collapse navbar-right">
                <ul className="nav navbar-nav">
                  {/* The navbar will show these links after you log in */}
                  <li><Link to="/home">Home</Link></li>
                  <li><a href="#" onClick={handleClick}>Logout</a></li>
                </ul>
              </div>
              : <div id="nav-items" className="collapse navbar-collapse navbar-right">
                {/* The navbar will show these links before you log in */}
                <ul className="nav navbar-nav">
                  <li><Link to="/products">Products</Link></li>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/signup">Sign Up</Link></li>
                </ul>
              </div>
          }

          <ul className="nav navbar-right">
            <li>
              <Link to="/shoppingcart" >
                <img src="icons8-Shopping Cart-50.png" height="20" width="20" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <hr />
      {children}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout());
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main));

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
