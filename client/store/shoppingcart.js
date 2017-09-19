import axios from 'axios';
import history from '../history';


// *** TODO *** 
// Add and remove products
// increase decrease quanity 

// finish submitOrder



/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const REMOVE_ITEM = 'REMOVE_ITEM';
const ADD_ITEM = 'ADD_ITEM';
const RESET_CART = 'RESET_CART';

/**
 * INITIAL STATE
 */
const defaultCart = [];
//     products: [],
// };

/**
 * ACTION CREATORS
 */
const getCartFromLocalStorage = productsInCart => ({ type: GET_CART, shoppingCart: productsInCart, });
const removeProduct = product => ({ type: REMOVE_ITEM, product, });
const addProduct = product => ({ type: ADD_ITEM, product, });
const resetCart = () => ({ type: RESET_CART })

/**
 * THUNK CREATORS
 */

export const fetchCartFromLocalStorage = () =>
    dispatch => {
        console.log('redux get localstorage',localStorage.getItem("Cart"));
        let productsInCart = [];
        if (localStorage.getItem("Cart") !== null)
            productsInCart = JSON.parse(localStorage.getItem("Cart"));
        
        dispatch(getCart(productsInCart));
    }


export const addToCart = (product) =>
    dispatch =>
    {
        dispatch(addItem(item));
        // const items = state.items;  ????
        // localStorage.removeItem("Cart");
        // localStorage.setItem("Cart",JSON.stringify(items));
    }
export const removeFromCart = (product) =>
    dispatch =>
    {
        // dispatch(removeItem(itemId));

    }
export const submitOrder = (orderData, products) =>
    dispatch =>
    {

			//total_price += loop through products
			// orderData.total_price = total_price;
			// orderData.products = this.state.products;

			axios.post(`/api/orders`, { user_request, total_price, products: shoppingCart})
			.then(res => res.data)
			.then(() => {
				dispatch(resetCart());
				console.log("created order and associated products"); 
				history.push('/confirmation');
			})
			.catch(err => {
				history.push('/error');
			});
		}

/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
    console.log('current state', state);
    switch (action.type) {
        case GET_CART:
            return Object.assign({}, state, {items: action.items});
        case REMOVE_ITEM:
            return Object.assign({}, state, {items: state.items.filter(item=> item.id !== action.itemId)});
        case ADD_ITEM:
            return Object.assign({}, state, {items: state.items.concat(action.item)});
        case RESET_CART:
            return [];
        default:
            return state;
    }
}