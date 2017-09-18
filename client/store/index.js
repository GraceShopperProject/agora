import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import user from './user';
import orders from './orders';
import shoppingcart from './shoppingcart';
import category from './category';

const reducer = combineReducers({ user, orders, shoppingcart, category });
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));
const store = createStore(reducer, composeWithDevTools(middleware));

export default store;
export * from './user';
export * from './shoppingcart';
export * from './orders';
export * from './category';
