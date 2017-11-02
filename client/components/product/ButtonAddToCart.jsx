import React from 'react';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Badge from 'react-bootstrap/lib/Badge';
import {addProduct} from '../../store';

const ButtonAddToCart = ({addToCart, product}) => {
  return (
    <Button
      bsStyle="primary"
      onClick={() => addToCart(product)}
      block
    >
      <Glyphicon glyph="plus" />
      <Glyphicon glyph="shopping-cart" />
    </Button>
  );
};

const mapDispatch = {addToCart: addProduct};

export default connect(null, mapDispatch)(ButtonAddToCart);
