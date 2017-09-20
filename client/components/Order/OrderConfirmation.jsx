import React from 'react';
import { connect } from 'react-redux';
import { me, buildOrder } from '../../store';

// TODO Form Authentication

/**
 * COMPONENT
 */
class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curOrderId: '',
    };
  }

  render() {
    return (
      <div>
        <h3>Your Order is has been Created</h3>
        <p>Thank you for using Agora, you will recieve a confirmation email in the next few minutes. Agora will send you an email in the next 3-5 business days when your order ships.</p>
        <div>
          If you have any questions, you are out of luck. We are insincerely sorry. :)
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */

const mapState = (state) => {
  // console.log(state);
  const curUser = state.user
    ? state.user
    : null;
  console.log('current user is ', curUser);
  return {
    name: curUser && curUser.name || {},
    curOrder: '',
  };
};

export default connect(mapState)(OrderConfirmation);

/**
 * PROP TYPES
 */
// AuthForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object,
// };
