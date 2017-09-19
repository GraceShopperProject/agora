import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS';
const GET_USER_ORDERS = 'GET_USER_ORDERS' // TODO
const CREATE_ORDER_AND_PRODUCTS = 'CREATE_ORDER_AND_PRODUCTS';

/**
 * INITIAL STATE
 */
const defaultOrders = [];

/**
 * ACTION CREATORS
 */
const getOrders = (orders) => ({ type: GET_ORDERS, orders});
const getUserOrders = (userOrders) => ({ type: GET_USER_ORDERS, userOrders });
const createOrder = ({user_request, itemsList}) => ({ type: CREATE_ORDER_AND_PRODUCTS, user_request, items_list }); // TODO ** ensure this pulls the correct user_request and total price

/**
 * THUNK CREATORS
 */
export const fetchOrders = () => {
  return (dispatch) => {
    axios.get('/api/orders')
      .then(res => res.data) 
      .then(() => {
        dispatch(getOrders(res.data || defaultOrders));
      })
      .catch(err => console.log(err));
  }
}

export const fetchUserOrders = (userId) => {
  return (dispatch) => {
    axios.get('/api/orders', { where: { userId } })
      .then(res => {
        dispatch(getOrders(res.data || defaultOrders));
      })
      .catch(err => console.log(err));
  }
}

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
