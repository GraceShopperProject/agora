import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import user from './user';
import orders from './orders';
import shoppingCart from './shoppingcart';
import categories from './category';
import products from './product';

const reducer = combineReducers({
  user,
  orders,
  shoppingCart,
  categories,
  products,
});

const middleware = applyMiddleware(thunkMiddleware, createLogger({
  collapsed: true,
}));
const store = createStore(reducer, composeWithDevTools(middleware));

export default store;
export * from './user';
export * from './shoppingcart';
export * from './orders';
export * from './category';
export * from './product';
