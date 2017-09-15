import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS';
const GET_USER_ORDERS = 'GET_USER_ORDERS' // TODO
const REMOVE_ORDERS = 'REMOVE_ORDERS';
const CREATE_ORDER = 'CREATE_ORDER';

/**
 * INITIAL STATE
 */
const defaultOrders = [];

/**
 * ACTION CREATORS
 */
const getOrders = (orders) => ({ type: GET_ORDERS, orders});
const createOrder = ({user_request, total_price}) => ({ type: CREATE_ORDER, user_request, total_price, }); // TODO ** ensure this pulls the correct user_request and total price
const removeOrder = (id) => ({ type: REMOVE_Orders, id });

/**
 * THUNK CREATORS
 */
export const fetchOrders = () =>
  dispatch =>
    axios.get('/api/orders')
      .then(res =>
        dispatch(getOrders(res.data || defaultOrders)))
      .catch(err => console.log(err));

// TODO do I dispatch products to redux ?
export const createOrder = (user_request, total_price) =>
  dispatch =>
    axios.post(`/api/orders`, { user_request, total_price, })
      .then((res) => { // TODO ** 
        dispatch(createOrder(res.data));
        history.push('/home'); // TODO where to go after order created
      })
      .catch(err => console.log(err));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then((res) => {
        dispatch(removeOrders());
        history.push('/login');
      })
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = defaultOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    case REMOVE_ORDERS:
      return defaultOrders;
    default:
      return state;
  }
}
