import React from 'react';
import { connect, } from 'react-redux';
import { me, buildOrder } from '../store';

// TODO Form Authentication

/**
 * COMPONENT
 */
class Confirmation extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      curOrderId: '', 
    };

    this.fillInDummyData = this.fillInDummyData.bind(this);
  }
  
  componentDidMount () {
    this.props.getCurUser();
    // TODO send confirmation email with all the orders
    // Can you add confirmation email sending with models?? If you change the status?
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
    const { error, } = this.props;
    return (
      <div>
        <h2>Your Order is has been Created</h2>
        <h3>Thank you for using Agora, you will recieve a confirmation email in the next few minutes. Agora will send you an email in the next 3-5 business days when your order ships. If you have any questions, you are out of luck. We are insincerely sorry. :)</h3>
        <div>
          One order list here. Get cur orderid???? 
        </div>
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
  console.log("current user is ", curUser);
  return {
    name: curUser && curUser.name || {}, 
    curOrder: '',
  }
}

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
