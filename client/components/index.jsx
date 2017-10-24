/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export { default as Home } from './Home';
export ErrorPage from './error';
export {
  NavFooterWrapper,
  Sidebar,
} from './Layout';
export {
  TopNavBar,
  Footer
} from './Navigation';
export {default as Category} from './category';
export {Login, Signup, } from './Authorize/auth-form';
export {default as UserHome, } from './user-home';

export {
  ShoppingCart
} from './ShoppingCart';

export {
  CheckoutForm,
  OrdersList,
  Confirmation,
} from './Order';

export {
  ProductList,
  ProductDetail,
} from './Product';

export {
    MaintainCatProD,
    MaintainUser,
} from './Admin';

export {
    UserAccount,
    UserOrder,
} from './UserAccount';

