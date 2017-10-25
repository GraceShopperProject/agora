import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS';
const GET_USER_ORDERS = 'GET_USER_ORDERS'; // TODO
const CREATE_ORDER_AND_PRODUCTS = 'CREATE_ORDER_AND_PRODUCTS';

/**
 * INITIAL STATE
 */
const defaultOrders = [];

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({ type: GET_ORDERS, orders });
const getUserOrders = userOrders => ({ type: GET_USER_ORDERS, userOrders });
const createOrder = ({ special_instructions, itemsList }) => ({ type: CREATE_ORDER_AND_PRODUCTS, special_instructions, items_list }); // TODO ** ensure this pulls the correct special_instructions and total price

/**
 * THUNK CREATORS
 */
export const fetchOrders = () => (dispatch) => {
  axios.get('/api/orders')
    .then(res => res.data)
    .then((allOrders) => {
      dispatch(getOrders(allOrders));
    })
    .catch(err => console.error(err));
};

export const fetchUserOrders = userId => (dispatch) => {
  axios.get('/api/orders', { where: { userId } })
    .then(res => res.data)
    .then((userOrders) => {
      dispatch(getOrders(userOrders));
    })
    .catch(err => console.error(err));
};

/**
 * REDUCER
 */
export default function (state = defaultOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    case GET_USER_ORDERS:
      return action.userOrders;
    case CREATE_ORDER_AND_PRODUCTS:
      return [state.orders, action.orders];
    default:
      return state;
  }
}
