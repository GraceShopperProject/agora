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
import Image from 'react-bootstrap/lib/Image';
import Badge from 'react-bootstrap/lib/Badge';
import Col from 'react-bootstrap/lib/Col';
import history from '../../history';

import {LoggedInNavButtons} from '../navigation';

function TopNavbar({isLoggedIn, isAdmin, numItemsInCart}) {
  return (
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/"><Image style={{height: '60px'}} src="/images/agora_logo2.svg" /></Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>

        <Col xsHidden>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="We have chairs..." />
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
const mapState = ({user, shoppingCart}) => ({
  isLoggedIn: Boolean(user.id),
  isAdmin: user.is_admin,
  numItemsInCart: shoppingCart.reduce((sum, item) => sum + item.quantity, 0),
});

// The `withRouter` wrapper makes sure that updates are not blocked when the url
// changes
export default withRouter(connect(mapState, null)(TopNavbar));
