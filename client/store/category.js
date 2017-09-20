import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES';
const DELETE_CATEGORY = 'DELETE_CATEGORY';
const ADD_CATEGORY = 'ADD_CATEGORY'

/**
 * INITIAL STATE
 */
const defaultCategories =[];

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({ type: GET_CATEGORIES, categories });
const removeCategory = categoryId => ({ type: DELETE_CATEGORY, categoryId })
const addOneCategory = category => ({ type: ADD_CATEGORY, category })
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
    axios.delete(`/api/category/${categoryId}/delete`)
        .then((res) => {
      console.log('delete done');
        dispatch(removeCategory(categoryId));
        })
        .catch(err => console.log(err));
};

export const addCategory = (category) => (dispatch) => {
    axios.post(`/api/category/`, category)
        .then((res) => {
            console.log('add category done');
            dispatch(addOneCategory(res.data));
        })
        .catch(err => console.log(err));
}
/**
 * REDUCER
 */
export default function (state = defaultCategories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    case DELETE_CATEGORY:
      return state.filter(category=> category.id !== action.categoryId);
    case ADD_CATEGORY:
      return state.concat(action.category);
    default:
      return state;
  }
}
