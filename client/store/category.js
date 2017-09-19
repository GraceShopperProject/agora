import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES';
const DELETE_CATEGORY = 'DELETE_CATEGORY'

/**
 * INITIAL STATE
 */
const defaultCategories = [];

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({ type: GET_CATEGORIES, categories });
const removeCategory = category => ({ type: DELETE_CATEGORY, category })
/**
 * THUNK CREATORS
 */
export const fetchCategories = () => (dispatch) => {
  axios.get('/api/category')
    .then((res) => {
      dispatch(getCategories(res.data || defaultCategories));
    })
    .catch(err => console.log(err));
};

export const deleteCategory = (categoryId) => (dispatch) => {


}
/**
 * REDUCER
 */
export default function (state = defaultCategories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    case DELETE_CATEGORY:
      return
    default:
      return state;
  }
}
