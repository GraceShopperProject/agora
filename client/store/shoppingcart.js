import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const REMOVE_ITEM = 'REMOVE_ITEM';
const ADD_ITEM = 'ADD_ITEM';
const CHECKOUT = 'CHECKOUT';

/**
 * INITIAL STATE
 */
const defaultCart = {
        items: [],
    };

/**
 * ACTION CREATORS
 */
const getCart = items => ({ type: GET_CART, items, });
const removeItem = itemId => ({ type: REMOVE_ITEM, itemId, });
const addItem = item => ({ type: ADD_ITEM, item, });
const checkout = () => ({ type: CHECKOUT, });

/**
 * THUNK CREATORS
 */

export const getshoppingcart = () =>
    dispatch =>
    {
        // if (localStorage.getItem("Cart")!==null)
        //     { const items = JSON.parse(localStorage.getItem("Cart"));}
        // else
            const items = [];
        dispatch(getCart(items));
    }

export const addshoppingcart = (item) =>
    dispatch =>
    {
        dispatch(addItem(item));
        // const items = state.items;  ????
        // localStorage.removeItem("Cart");
        // localStorage.setItem("Cart",JSON.stringify(items));
    }
export const removeshoppingcart = (itemId) =>
    dispatch =>
    {
        dispatch(removeItem(itemId));

    }
export const checkoutshoppingcart = () =>
    dispatch =>
    {
        dispatch(checkout());
        localStorage.removeItem("Cart");
    }
/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
    console.log('curent state', state);
    switch (action.type) {
        case GET_CART:
            return Object.assign({}, state, {items: action.items});
        case REMOVE_ITEM:
            return Object.assign({}, state, {items: state.items.filter(item=> item.id !== action.itemId)});
        case ADD_ITEM:
            return Object.assign({}, state, {items: state.items.concat(action.item)});
        case CHECKOUT:
            return {};
        default:
            return state;
    }
}