import React from 'react';
import { connect, } from 'react-redux';
import { me, buildOrder } from '../store';

/**
 * COMPONENT
 */
class CheckoutForm extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      name: '', 
      street_address_1: '', 
      street_address_2: '', 
      city: '', 
      state: '', 
      zip: '',
      email: '',
    };

    this.fillInDummyData = this.fillInDummyData.bind(this);
  }
  
  componentDidMount () {
    this.props.getCurUser();
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
    });
  }

  render () {
    const { name, street_address_1, street_address_2, city, state, zip, } = this.state;
    const { handleSubmit, error, } = this.props;
    return (
      <div>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="name"><small>Name</small></label>
            <input name="name" type="text" />
          </div>
          <div>
            <label htmlFor="street_address_1"><small>Street Address 1:</small></label>
            <input name="street_address_1" type="text" value={street_address_1} />
          </div>
          <div>
            <label htmlFor="street_address_2"><small>Street Address 2:</small></label>
            <input name="street_address_2" type="text" value={street_address_2} />
          </div>
          <div>
            <label htmlFor="city"><small>City:</small></label>
            <input name="city" type="text" value={city} />
          </div>
          <div>
            <label htmlFor="state"><small>State:</small></label>
            <input name="state" type="text" value={state} />
          </div>
          <div>
            <label htmlFor="zip"><small>Zip Code:</small></label>
            <input name="zip" type="text" value={zip} />
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
  // //console.log(state);
  // const curUser = state.user
  // ? state.user
  // : null;

  return {
    name: '', 
    street_address_1: '', 
    street_address_2: '', 
    city: '', 
    state: '', 
    zip: '',
    email: '',
  }
  // return {
  //   name: curUser && curUser.name ? curUser.name : '', 
  //   street_address_1: curUser.street_address_1 || '', 
  //   street_address_2: curUser.street_address_2 || '', 
  //   city: curUser.city || '', 
  //   state: curUser.state || '', 
  //   zip: curUser.zip || '',
  //   email: curUser.email || '',
  // }
}

const mapDispatch = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault();
    console.log("You've submitted me!!");

    const cart_product_list = JSON.parse(localStorage.getItem("Cart"));
    
    // buildOrder(user_request, product_list);
    dispatch(buildOrder(null, cart_product_list));

    // *** 
    //send information from the window.localStorage to orders component where create the order + product affiliations

  },

  getCurUser () {
    dispatch (me());
  }
    
    // const target = evt.target;
    // const formName = evt.target.name;

    // const email = evt.target.email.value;
    // const password = evt.target.password.value;
    // let name = '';
    // formName === 'signup' ? name = evt.target.nameSignup.value : '';
    // dispatch(auth(email, password, name, formName));
});

export default connect(mapState, mapDispatch)(CheckoutForm);

/**
 * PROP TYPES
 */
// AuthForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object,
// };
