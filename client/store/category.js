import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CATEGORY = 'GET_CATEGORY';
const GET_PRODUCT_CATEGORY = 'GET_PRODUCT_CATEGORY';

/**
 * INITIAL STATE
 */
const defaultCategory = {};

/**
 * ACTION CREATORS
 */
const getCategory = (category) => ({ type: GET_CATEGORY, category});
const getProductCategory = (category) => ({ type: GET_PRODUCT_CATEGORY, category});

/**
 * THUNK CREATORS
 */
export const fetchCategory = () => {
    return (dispatch) => {
        axios.get('/api/category')
            .then(res => {
                dispatch(getCategory(res.data || defaultCategory));
            })
            .catch(err => console.log(err));
    }
}

export const fetchProductCategory = (productId) => {
    return (dispatch) => {

        axios.get(`/api/category/products/${productId}`)
            .then(res => {
                dispatch(getProductCategory(res.data || defaultState));
            })
            .catch(err => console.log(err));
    }
}
/**
 * REDUCER
 */
export default function (state = defaultCategory, action) {
    switch (action.type) {
        case GET_CATEGORY:
            return action.category;
        case GET_PRODUCT_CATEGORY:
            return  Object.assign({}, state, {currentCategory: action.category});
        default:
            return state;
    }
}
