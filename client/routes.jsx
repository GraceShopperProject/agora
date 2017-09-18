import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { Router, } from 'react-router';
import { Route, Switch, } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';

import { Main, Login, Signup, UserHome, ShoppingCart, OrdersList, Category, Productpage, } from './components/index.jsx';
import { me, getshoppingcart, fetchOrders, fetchCategory,  } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, } = this.props;

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/orders" component={OrdersList} />
            <Route path="/shoppingcart" component={ShoppingCart} />
            <Route exact path="/category" component={Category}/>
            <Route path="/category/:categoryId" component={Productpage} />
            {/*<Route path="/products/:productId" component={ProductDetailpage} />*/}
            {
              isLoggedIn &&
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route path="/home" component={UserHome} />
              </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
  // Otherwise, state.user will be an empty object, and state.user.id will be falsey
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  loadInitialData() {
      dispatch(fetchOrders());
      dispatch(fetchCategory());
      dispatch(getshoppingcart());
      dispatch(me());
  },
});

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
