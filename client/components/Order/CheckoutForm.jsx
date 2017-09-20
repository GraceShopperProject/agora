import React from 'react';
import { connect } from 'react-redux';
import { submitOrder } from '../../store';

// TODO Form Authentication

/**
 * COMPONENT
 */
class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    const { user, shoppingCart } = props;
    this.state = {
      products: shoppingCart, // productsInsideShoppingCart
      order: {
        userId: user.id,
        // name: user.name,
        // street_address_1: user.street_address_1,
        // street_address_2: user.street_address_2,
        // city: user.city,
        // state: user.state,
        // zip: user.zip,
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
    this.setState({
      [name]: value,
    });
  }

  fillInDummyData(evt) {
    evt.preventDefault();
    console.log('dummy data');
    this.setState({
      name: 'hi',
      street_address_1: 'hi',
      street_address_2: 'hi',
      city: 'hi',
      state: 'hi',
      zip: '11111',
      email: 'hi@hi.hi',
      user_request: 'hi hi hi',
    });
  }

  render() {
    const {
      handleCheckout,
    } = this.props;
    return (
      <div>
        <h2>Checkout</h2>
        <form onSubmit={(evt) => {
          evt.preventDefault();
          handleCheckout(this.state);
        }}
        >
          <div>
            <label htmlFor="name"><small>Name</small></label>
            <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="street_address_1"><small>Street Address 1:</small></label>
            <input name="street_address_1" type="text" onChange={this.handleChange} value={this.state.street_address_1} />
          </div>
          <div>
            <label htmlFor="street_address_2"><small>Street Address 2:</small></label>
            <input name="street_address_2" type="text" onChange={this.handleChange} value={this.state.street_address_2} />
          </div>
          <div>
            <label htmlFor="city"><small>City:</small></label>
            <input name="city" type="text" onChange={this.handleChange} value={this.state.city} />
          </div>
          <div>
            <label htmlFor="state"><small>State:</small></label>
            <input name="state" type="text" onChange={this.handleChange} value={this.state.state} />
          </div>
          <div>
            <label htmlFor="zip"><small>Zip Code:</small></label>
            <input name="zip" type="text" onChange={this.handleChange} value={this.state.zip} />
          </div>
          <div>
            <label htmlFor="user_request"><small>Special instructions:</small></label>
            <input name="user_request" type="text" onChange={this.handleChange} value={this.state.user_request} />
          </div>
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
  handleCheckout: (orderData) => {
    dispatch(submitOrder(orderData));
  },
});

export default connect(mapState, mapDispatch)(CheckoutForm);
