import React from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  // const { email, } = props;

  const { name, } = props;
  return (
    <div>
      <h1>Welcome, {name}</h1>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => ({
  // email: state.user.email,
    name: state.user.name
});

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
};