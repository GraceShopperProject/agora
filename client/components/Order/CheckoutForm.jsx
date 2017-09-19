import React from 'react';
import { connect, } from 'react-redux';
import { submitOrder } from '../../store';

// TODO Form Authentication

/**
 * COMPONENT
 */
class CheckoutForm extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      ...this.props,
      user_request: '',
    };

    this.fillInDummyData = this.fillInDummyData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    this.props.getCurUser();
  }

  handleChange (evt) {
    evt.preventDefault();
    const name = evt.target.name
    const value = evt.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.props.dispatch(submitOrder(this.state));
  }

  fillInDummyData(evt) {
    evt.preventDefault();
    console.log("dummy data");
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

  render () {
    return (
      <div>
        <h2>Checkout</h2>
        <form onSubmit={this.handleSubmit}>
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
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  }
};

/**
 * CONTAINER
 */

const mapState = state => {
  const curUser = state.user
  ? state.user
  : null;

  return {
    products: state.shoppingcart, // productsInsideShoppingCart
    name: curUser && curUser.name ? curUser.name : '',
    street_address_1: curUser.street_address_1 || '',
    street_address_2: curUser.street_address_2 || '',
    city: curUser.city || '',
    state: curUser.state || '',
    zip: curUser.zip || '',
    email: curUser.email || '',
  }
}

export default connect(mapState)(CheckoutForm);
