import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CATEGORY = 'GET_CATEGORY';

/**
 * INITIAL STATE
 */
const defaultCategory = {};

/**
 * ACTION CREATORS
 */
const getCategory = (category) => ({ type: GET_CATEGORY, category});

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

/**
 * REDUCER
 */
export default function (state = defaultCategory, action) {
    switch (action.type) {
        case GET_CATEGORY:
            return action.category;
        default:
            return state;
    }
}
