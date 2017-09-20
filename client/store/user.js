import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER = 'UPDATE_USER';
const GET_ALLUSERS = 'GET_ALLUSERS';

/**
 * INITIAL STATE
 */
const defaultUser = {
  id: '',
  name: '',
  street_address_1: '',
  street_address_2: '',
  city: '',
  state: '',
  zip: '',
  email: '',
};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user, });
const removeUser = () => ({ type: REMOVE_USER, });
const editUser = user => ({type: UPDATE_USER,  user, })
const getAllUsers = users => ({ type: GET_ALLUSERS, users, })

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err));

export const auth = (email, password, name, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, name })
      .then((res) => {
        dispatch(getUser(res.data));
        history.push('/home');
      })
      .catch(error =>
        dispatch(getUser({ error })));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then((res) => {
        dispatch(removeUser());
        history.push('/login');
      })
      .catch(err => console.log(err));

export const updateUser = (user) =>
    dispatch => {
        console.log('update user', user,'/users/update',)
        axios.post('/api/users/update', user)
            .then((res) => {
                dispatch(editUser(res.config.data));
            })
            .catch(err => console.log(err));
    }

export const upgradeUser = (userId) =>
    dispatch => {
        const user = {id:userId }
        axios.post('/api/users/upgrade', user)
            .then((res) => {
                console.log('user upgrade to Admin')
            })
            .catch(err => console.log(err));
    }

export const getUsers = (userId) =>
    dispatch => {
        axios.get('/api/users/')
            .then((res) => {
                dispatch(getAllUsers(res.data || defaultUser))
            })
            .catch(err => console.log(err));
    }
/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case UPDATE_USER:
      return action.user;
    case GET_ALLUSERS:
      return Object.assign({}, state, {users: action.users});
    default:
      return state;
  }
}
