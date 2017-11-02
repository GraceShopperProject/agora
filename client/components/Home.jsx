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
        <div className="subheading-container">
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

          <section className="subheadings">
            <h2>About Agora</h2>
            <p>Agora, the classiest chair market place in the world. Impress the in-laws, your guests, your children, and even your dog with the classiest of chairs.</p>

            <p>From humble beginnings, Agora started with a chair in a garage. Our founder then started a new mobile app to show off this classy, classy chair. This app went viral with over 1 billion views in one week. Our founder, an entrepreneur and capitalist at heart, decided he wanted to create the largest empire of classy chairs in the world and sell them to you to spread classy chair joy to everyone.</p>

            <p>Please while you browse our selections, remember where Agora came from and don't forget: at Agora, we have chairs.</p>
          </section>
          <section className="subheadings">
            <h2>The Truth About Agora</h2>
            <p>Agora was created for a E-Commerce website project for Fullstack Academy's remote immersive program.</p>
            <p>It integrates React, Node, Express, Socket.io, and a PostGres database. We hope you enjoy exploring!</p>
          </section>
          <section id="testimonies" className="subheadings">
            <h2>Testimonies</h2>
            <div>
              <p>"Classy."</p>
              <p>"How so classy."</p>
              <p>"Wow! They really have chairs!"</p>
            </div>
          </section>
        </div>
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
