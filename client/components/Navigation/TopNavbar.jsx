import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Badge from 'react-bootstrap/lib/Badge';
import Col from 'react-bootstrap/lib/Col';
import history from '../../history';

import {LoggedInNavButtons} from '../Navigation';

function TopNavbar({isLoggedIn, isAdmin, numItemsInCart}) {
  return (
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Agora!</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>

        <Col xsHidden>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Magic happens here" />
              {' '}
              <Button>Search</Button>
            </FormGroup>
          </Navbar.Form>
        </Col>

        <Nav pullRight>
          {isLoggedIn && <LoggedInNavButtons isAdmin={isAdmin} />}

          {!isLoggedIn &&
          <NavItem onClick={() => history.push('/signup')}>Sign Up</NavItem>
          }

          {!isLoggedIn &&
          <NavItem onClick={() => history.push('/login')}>Log In</NavItem>
          }

          <NavItem onClick={() => history.push('/shoppingcart')}>
            {'Cart '}
            <Glyphicon glyph="shopping-cart" />
            <Badge>{numItemsInCart}</Badge>
          </NavItem>
        </Nav>

      </Navbar.Collapse>

    </Navbar>
  );
}

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: Boolean(state.user.id),
  isAdmin: state.user.is_admin,
  numItemsInCart: state.shoppingCart.length,
});

// The `withRouter` wrapper makes sure that updates are not blocked when the url
// changes
export default withRouter(connect(mapState, null)(TopNavbar));

// --------------------------- import React from 'react'; import { connect }
// from 'react-redux'; import { withRouter, Link } from 'react-router-dom';
// import {   LoggedInNavButtons,   LoggedOutNavButtons,
// AdminLoggedInNavButtons, } from '../Navigation'; function TopNavbar
// ({children, isLoggedIn, isAdmin, }) {   return (     <nav className="navbar
// navbar-expand-lg navbar-dark"       style={{ backgroundColor: '#874C62' }}
//  >       <div className="container"> <Link           className="navbar-brand"
//           to="/"         > Agora         </Link>         <form
// className="form-inline">           <input             className="form-control
// mr-sm-2"             type="text"    placeholder="Search"
// aria-label="Search"           />  <button className="btn btn-outline-light
// my-2 my-sm-0" type="submit">Search</button>         </form>         <div
// className="navbar-nav">           {isLoggedIn             ?   isAdmin
//   ?  <AdminLoggedInNavButtons />                   : <LoggedInNavButtons />
//           : <LoggedOutNavButtons />           }      <Link to="/shoppingcart"
// className="nav-item nav-link"> <button className="btn btn-outline-light">
//           Cart </button>           </Link>         </div>       </div>
// </nav>   ); } /**
//  * CONTAINER  */ const mapState = state => ({   isLoggedIn: !!state.user.id,
// isAdmin :  state.user.is_admin }); // The `withRouter` wrapper makes sure
// that updates are not blocked // when the url changes export default
// withRouter(connect(mapState, null)(TopNavbar));
