
import axios from 'axios';
import history from '../history';
/* ACTION TYPES
*/

const GET_CATEGORY_PRODUCTS = 'GET_CATEGORY_PRODUCTS';

/**
 * INITIAL STATE
 */
const defaultState = [];

/**
 * ACTION CREATORS
 */

const getCategoryProducts = (products) => ({ type: GET_CATEGORY_PRODUCTS, products});
/**
 * THUNK CREATORS
 */


export const fetchCategoryProducts = (categoryId) => {
    return (dispatch) => {
        axios.get(`/api/products/category/${categoryId}`)
            .then(res => {
                dispatch(getCategoryProducts(res.data || defaultState));
            })
            .catch(err => console.log(err));
    }
}

/**
 * REDUCER
 */
export default function (state = defaultState, action) {
    switch (action.type) {
        case GET_CATEGORY_PRODUCTS:
            return  action.products;
        default:
            return state;
    }
}
