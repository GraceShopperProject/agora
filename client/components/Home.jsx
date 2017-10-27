import React from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import { me } from '../store';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

class Home extends React.Component {
  
  constructor (props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.getUser();
  }
  
  render () {
    console.log("Homepage!");
    const { name, } = this.props;
    console.log("Name is :", name);
    console.log(this.props);
    return (
      <div>
        <Jumbotron>
        {
          (name)
            ? (<h1>Welcome, {name}</h1>)
            : (<h1>Welcome to Agora!</h1>)
        }
        </Jumbotron>
      </div>
    );
  }
}

const mapState = (state) => {
  // email: state.user.email,
  console.log("State is: ", state);
  return {
    name: state.user.name,
    email: state.user.email,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUser: () => {dispatch(me())}
  }
}

export default connect(mapState, mapDispatch)(Home);

Home.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
};
