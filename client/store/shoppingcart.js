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
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';
const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
const SET_QUANTITY = 'SET_QUANTITY';
const RESET_CART = 'RESET_CART';


/**
 * ACTION CREATORS
 */
const getCartFromLocalStorage = shoppingCart => ({
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
    console.log('redux get localstorage', localStorage.getItem('Cart'));
    let productsInCart = [];
    if (localStorage.getItem('Cart') !== null) { productsInCart = JSON.parse(localStorage.getItem('Cart')); }

    dispatch(getCart(productsInCart));
  };


export const submitOrder = (orderData, products) => (dispatch) => {
  // *** TODO: ***
  // total_price += loop through products
  // orderData.total_price = total_price;
  // orderData.products = this.state.products;

  axios.post('/api/orders', orderData)
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

const addOrIncreaseProduct = (cart, productToAdd) => {
  const productInCart = cart.find(product => product.id === productToAdd.id);
  if (productInCart !== -1) product.quantity++;
  else {
    productToAdd.quantitiy = 1;
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
      return;
    case RESET_CART:
      return [];
    default:
      return shoppingCart;
  }
}
