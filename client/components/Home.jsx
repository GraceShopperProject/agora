import React from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Image from 'react-bootstrap/lib/Image';
import { me } from '../store';

class Home extends React.Component {

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    console.log("Homepage!");
    const { name, } = this.props;
    console.log("Name is :", name);
    console.log(this.props);
    return (
      <div>
        <section>

          <Jumbotron className="jumbotron-billboard">
            <div className="img"></div>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <Image src="/images/agora_logo2.svg" />
                  <p>The real you needs comfort.</p>
                  <p>The real you needs class.</p>
                  <p>The real you needs Agora.</p>
                  <p>We have chairs.</p>
                </div>
              </div>
            </div>
          </Jumbotron>
        </section>
        <section>
          <h2>About</h2>
          <p>Agora was created for a E-Commerce website project for Fullstack Academy's remote immersive program. It integrates React, Node, Express, Socket.io, and a PostGres database. We hope you enjoy exploring!</p>
        </section>
        <section>
          <h2>Testimonies</h2>
          <p>"Classy."</p>
          <p>"How so classy."</p>
          <p>"Wow! They really have chairs!"</p>
        </section>
        {
          (name)
            ? (<h1>Welcome, {name}</h1>)
            : (<h1>Welcome to Agora!</h1>)
        }
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
    getUser: () => { dispatch(me()) }
  };
};

export default connect(mapState, mapDispatch)(Home);

Home.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
};
