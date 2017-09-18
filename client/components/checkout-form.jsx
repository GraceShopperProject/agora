import React from 'react';
import { connect, } from 'react-redux';
import { me, buildOrder } from '../store';

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
    console.log("CHANGING");
    const name = evt.target.name
    const value = evt.target.value;
    this.setState({
      [name]: value,
    });
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
    const { handleSubmit, error, } = this.props;
    return (
      <div>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit} name={name}>
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
  //console.log(state);
  const curUser = state.user
  ? state.user
  : null;

  return {
    name: curUser && curUser.name ? curUser.name : '', 
    street_address_1: curUser.street_address_1 || '', 
    street_address_2: curUser.street_address_2 || '', 
    city: curUser.city || '', 
    state: curUser.state || '', 
    zip: curUser.zip || '',
    email: curUser.email || '',
  }
}

const mapDispatch = (dispatch, ownProps)  => ({
  handleSubmit(evt, user_request) {
    evt.preventDefault();
    console.log("You've submitted me!!");
    const cart_product_list = JSON.parse(localStorage.getItem("Cart"));

    console.log("MY OWN PROPS IS :", ownProps);
    
    // buildOrder(user_request, product_list, total_price);
    dispatch(buildOrder(ownProps.user_request, cart_product_list));
  },

  getCurUser () {
    dispatch (me());
  }
});

export default connect(mapState, mapDispatch)(CheckoutForm);

/**
 * PROP TYPES
 */
//   .propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object,
// };
