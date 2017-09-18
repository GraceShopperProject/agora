/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main, } from './main';
export {NavFooterWrapper} from './Layout';
export {TopNavBar, Footer} from './Navigation';
export {default as UserHome, } from './user-home';
export {Login, Signup, } from './auth-form';

export {default as Home} from './Home';
export ShoppingCart from './ShoppingCart';
export {default as CheckoutForm, } from './checkout-form';
export {default as Category} from './category';

export {default as ProductDetailpage} from './productdetailpage';

export {default as OrdersList, } from './orders-list';
export Productpage from './productpage';
export ErrorPage from './error';
export Confirmation from './confirmation';
export Sidebar from './sidebar';
