import axios from 'axios';

/* ACTION TYPES
*/

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

/**
 * INITIAL STATE
 */
const defaultState = [];

/**
 * ACTION CREATORS
 */

const getAllProducts = products => ({ type: GET_ALL_PRODUCTS, products });
/**
 * THUNK CREATORS
 */


export const fetchProducts = () => (dispatch) => {
  axios.get('/api/products/')
    .then(res => res.data)
    .then((allProducts) => {
      dispatch(getAllProducts(allProducts));
    })
    .catch(err => console.log(err));
};

/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
