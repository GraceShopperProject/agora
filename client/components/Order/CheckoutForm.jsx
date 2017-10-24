import React from 'react';
import { connect } from 'react-redux';
import { submitOrder, me } from '../../store';
import FormItem from './FormItem';

// TODO Form Authentication

/**
 * COMPONENT
 */
class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      name: user.name,
      street_address_1: user.street_address_1 || '',
      street_address_2: user.street_address_2,
      city: user.city,
      state: user.state,
      zip: user.zip,
      confirmation_email: user.email,
      special_instructions: '',
    };

    this.fillInDummyData = this.fillInDummyData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitCart = this.submitCart.bind(this);
    this.renderFormItems = this.renderFormItems.bind(this);
  }

  handleChange(evt) {
    evt.preventDefault();
    const name = evt.target.name;
    const value = evt.target.value;
    this.setState({ [name]: value, });
  }

  fillInDummyData(evt) {
    evt.preventDefault();
    this.setState({
      name: 'hi',
      street_address_1: 'hi',
      street_address_2: 'hi',
      city: 'hi',
      state: 'hi',
      zip: '11111',
      confirmation_email: 'hi@hi.hi',
      special_instructions: 'hi hi hi',
    });
  }

  submitCart(order) {
    this.props.handleCheckout(order, this.props.shoppingCart);
  }

  renderFormItems() {
    const keys = Object.keys(this.state);
    return keys.map((key, idx) => (
      <FormItem key={idx} handleChange={this.handleChange} name={key} value={this.state[key]} />
    ));
  }

  render() {
    const { name, street_address_1, street_address_2, city, state, zip, confirmation_email, special_instructions } = this.state;

    return (
      <div>
        <h2>Checkout</h2>
        <form onSubmit={(evt) => {
          evt.preventDefault();
          const order = { name, street_address_1, street_address_2, city, state, zip, confirmation_email, user_request: special_instructions }
          this.submitCart(order)
        }}>
          {
            this.renderFormItems()
          }
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
  handleCheckout: (orderData, shoppingCartProducts) => {
    orderData.products = shoppingCartProducts;
    console.log('Order data is: ', orderData, "products are :", shoppingCartProducts)
    dispatch(submitOrder(orderData, shoppingCartProducts));
  },
  getUserInfo: () => {
    dispatch(me());
  }
});

export default connect(mapState, mapDispatch)(CheckoutForm);
