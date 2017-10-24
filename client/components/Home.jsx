import React from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';

export const Home = (props) => {
  console.log("Homepage!");
  const { name, } = props;
  return 
    { name 
      ? (<h1>Welcome, {name}</h1>)
      : (<h1>Welcome to Agora!</h1>)
    };
}

const mapState = state => ({
  // email: state.user.email,
  name: state.user.name
});

export default connect(mapState)(Home);

Home.propTypes = {
  email: PropTypes.string,
};
