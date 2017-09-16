import axios from 'axios';

// ----------------- ACTIONS ------------------------

const INITIALIZE_PRODUCTS = 'INITIALIZE_PRODUCTS';


// ----------------- ACTION CREATORS ------------------------

const initializeProducts = products => ({
  type: INITIALIZE_PRODUCTS,
  products,
});


// ----------------- THUNK CREATORS ------------------------

const getAllProducts = () => dispatch => axios.get('/api/products')
  .then(products => dispatch(initializeProducts(products)));

// ----------------- REDUCER ------------------------

export default (products = {}, action) => {
  switch (action.type) {
    case INITIALIZE_PRODUCTS:
      return action.products;
    default:
      return products;
  }
};
