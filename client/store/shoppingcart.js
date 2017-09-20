import axios from 'axios';
import history from '../history';
import store from '../store';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';
const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
const SET_QUANTITY = 'SET_QUANTITY';
const RESET_CART = 'RESET_CART';

/**
 * ACTION CREATORS
 */
const getCart = shoppingCart => ({
  type: GET_CART,
  shoppingCart,
});
export const removeProduct = product => ({
  type: REMOVE_PRODUCT,
  product,
});
export const addProduct = product => ({
  type: ADD_PRODUCT,
  product,
});
export const increaseQuantity = product => ({
  type: INCREASE_QUANTITY,
  product,
});
export const decreaseQuantity = product => ({
  type: DECREASE_QUANTITY,
  product,
});
export const setQuantity = (product, quantity) => ({
  type: SET_QUANTITY,
  product,
  quantity,
});
export const resetCart = () => ({ type: RESET_CART });

/**
 * THUNK CREATORS
 */

export const fetchCartFromLocalStorage = () =>
  (dispatch) => {
    let productsInCart = [];
    if (localStorage.getItem('Cart') !== null) {
      productsInCart = JSON.parse(localStorage.getItem('Cart'));
    }
    dispatch(getCart(productsInCart));
  };


export const submitOrder = (orderData, productsInCart) => (dispatch) => {

  const total_price = orderData.products
    .reduce((total, { price, quantity }) => total + (price * quantity), 0);


  axios.post('/api/orders', {...orderData, total_price, productsInCart})
    .then(res => res.data)
    .then(() => {
      dispatch(resetCart());
      console.log('created order and associated products');
      history.push('/confirmation');
    })
    .catch((err) => {
      history.push('/error');
    });
};

// ------------------------ UTILS ---------------------------

const addOrIncreaseProduct = (cart, productToAdd, quantity) => {
  console.log("prod to add:", productToAdd);
  const quantityToAdd = quantity ? +quantity : 1;
  console.log(quantity);
  const productInCart = cart.find(product => product.id === productToAdd.id);
  if (productInCart) productInCart.quantity += quantityToAdd;
  else {
    productToAdd.quantity = quantityToAdd;
    cart.push(productToAdd);
  }
  return cart;
};

const removeOrDecreaseProduct = (cart, productToRemove) => {
  const productInCart = cart.find(product => product.id === productToRemove.id);
  if (productInCart !== -1 && productInCart.quantity > 1) {
    productInCart.quantity -= 1;
    return cart;
  }
  const cartWithProductRemoved = cart.filter(product => product.id !== productToRemove.id);

  return cartWithProductRemoved;
};

/**
 * REDUCER
 */
export default function (shoppingCart = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.shoppingCart;
    case REMOVE_PRODUCT:
      return shoppingCart.filter(product => product.id !== action.product.id);
    case ADD_PRODUCT:
      return addOrIncreaseProduct([...shoppingCart], action.product);
    case INCREASE_QUANTITY:
      return addOrIncreaseProduct([...shoppingCart], action.product);
    case DECREASE_QUANTITY:
      return removeOrDecreaseProduct([...shoppingCart], action.product);
    case SET_QUANTITY:
      return addOrIncreaseProduct([...shoppingCart], action.product, action.quantity);
    case RESET_CART:
      return [];
    default:
      return shoppingCart;
  }
}
