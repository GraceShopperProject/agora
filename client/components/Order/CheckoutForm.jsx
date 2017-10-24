import React from 'react';
import { connect } from 'react-redux';
import { submitOrder, me } from '../../store';
import { FormItem } from './FormItem';

// TODO Form Authentication

/**
 * COMPONENT
 */
class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    const { user, shoppingCart } = props;
    this.state = {
      products: shoppingCart,
      order: {
        userId: user.id,
        name: user.name,
        street_address_1: user.street_address_1 || '',
        street_address_2: user.street_address_2,
        city: user.city,
        state: user.state,
        zip: user.zip,
        confirmation_email: user.email,
        user_request: '',
      },
    };

    this.fillInDummyData = this.fillInDummyData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    evt.preventDefault();
    const name = evt.target.name;
    const value = evt.target.value;
    this.setState(
      {
        order: {
          [name]: value,
        }
      });
  }

  fillInDummyData(evt) {
    evt.preventDefault();
    const userId = this.state.userId;
    this.setState({
      order: {
        userId,
        name: 'hi',
        street_address_1: 'hi',
        street_address_2: 'hi',
        city: 'hi',
        state: 'hi',
        zip: '11111',
        confirmation_email: 'hi@hi.hi',
        user_request: 'hi hi hi',
      }
    });
  }

  render() {
    const { handleCheckout, } = this.props;
    const { order } = this.state;
    return (
      <div>
        <h2>Checkout</h2>
        <form onSubmit={(evt) => {
          evt.preventDefault();
          handleCheckout(order, this.state.products);
        }}
        >
          <FormItem handleChange={this.handleChange} itemName={"name"} orderInfo={order} text={"Name:"} />
          <FormItem handleChange={this.handleChange} itemName={"confirmation_email"} orderInfo={order} text={"Email:"} />
          <FormItem handleChange={this.handleChange} itemName={"street_address_1"} orderInfo={order} text={"Street Address 2"} />
          <FormItem handleChange={this.handleChange} itemName={"street_address_2"} orderInfo={order} text={"Street Address 2:"} />
          <FormItem handleChange={this.handleChange} itemName={"city"} orderInfo={order} text={"City:"} />
          <FormItem handleChange={this.handleChange} itemName={"state"} orderInfo={order} text={"State:"} />
          <FormItem handleChange={this.handleChange} itemName={"zip"} orderInfo={order} text={"Zip Code:"} />
          <FormItem handleChange={this.handleChange} itemName={"user_request"} orderInfo={order} text={"Special instructions:"} />

          <div>
            <button type="submit">Submit</button>
            <button onClick={this.fillInDummyData}>Quick Fill in Data</button>
          </div>
        </form>
      </div>
    );
  }
}

/**
 * CONTAINER
 */

const mapState = ({ user, shoppingCart }) => ({
  user,
  shoppingCart,
});

const mapDispatch = dispatch => ({
  handleCheckout: (orderData, productsInShoppingCart) => {
    orderData.products = productsInShoppingCart;
    dispatch(submitOrder(orderData));
  },
  getUserInfo: () => {
    dispatch(me());
  }
});

export default connect(mapState, mapDispatch)(CheckoutForm);
