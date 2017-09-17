import { createStore, combineReducers, applyMiddleware, } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import orders from './orders';
import shoppingcart from './shoppingcart';

const reducer = combineReducers({ user, orders, shoppingcart, });
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true, }));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './shoppingcart';
export * from './orders';
