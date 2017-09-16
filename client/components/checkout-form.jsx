import React from 'react';
import { connect, } from 'react-redux';

/**
 * COMPONENT
 */
const CheckoutForm = (props) => {
  const { name, street_address_1, street_address_2, city, state, zip, handleSubmit, error, } = props;

  return (
    <div>
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
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 */

const mapState = state => {
  const curUser = state.user.id 
  ? this.state.user
  : null;
  return {
    name: curUser.name || '', 
    street_address_1: curUser.street_address_1 || '', 
    street_address_2: curUser.street_address_2 || '', 
    city: curUser.city || '', 
    state: curUser.state || '', 
    zip: curUser.zip || '',
    email: curUser.email || '',
  }
}

const mapDispatch = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault();
    console.log("You've submittd me!!");
    // const target = evt.target;
    // const formName = evt.target.name;

    // const email = evt.target.email.value;
    // const password = evt.target.password.value;
    // let name = '';
    // formName === 'signup' ? name = evt.target.nameSignup.value : '';
    // dispatch(auth(email, password, name, formName));
  },
});

export const Signup = connect(mapSignup, mapDispatch)(CheckoutForm);

/**
 * PROP TYPES
 */
// AuthForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object,
// };
