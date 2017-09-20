import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';

import {
  NavFooterWrapper,
  Home,
  Login,
  Signup,
  UserHome,
  ShoppingCart,
  OrdersList,
  Category,

  ProductList,
  ProductDetail,
  CheckoutForm,
  ErrorPage,
  Confirmation,
  MaintainCatProD,
  MaintainUser,
  UserAccount,

} from './components';
import {
  me,
  getshoppingcart,
  fetchOrders,
  fetchCategories,
  fetchProducts,
} from './store';


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData();
  }

  render () {
    const {isLoggedIn} = this.props;

    return (
      <Router history={history}>
        <NavFooterWrapper>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/orders" component={OrdersList} />
            <Route path="/shoppingcart" component={ShoppingCart} />
            <Route path="/checkoutform" component={CheckoutForm} />


            <Route path="/category/:categoryId" component={ProductList} />
            <Route exact path="/category" component={Category} />
            <Route path="/products/:productId" component={ProductDetail} />
            <Route path="/products" component={ProductList} />
            <Route path="/confirmation" component={Confirmation} />
            <Route path="/error" component={ErrorPage} />
            <Route path="/adminProduct" component = {MaintainCatProD} />
            <Route path="/adminUser" component = {MaintainUser} />
            <Route path="/account" component = {UserAccount} />

            {
              isLoggedIn &&
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route path="/home" component={UserHome} />
              </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Home} />
          </Switch>
        </NavFooterWrapper>
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
  loadInitialData () {
    dispatch(fetchOrders());
    dispatch(fetchCategories());
    dispatch(getshoppingcart());
    dispatch(fetchProducts());
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
