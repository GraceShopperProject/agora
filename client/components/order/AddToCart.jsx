import React from 'react';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Row from 'react-bootstrap/lib/Row';
import { addProduct, setQuantity } from '../../store';

function AddToCart(props) {
  const product = props.product;
  return (
    <Col sm={12} md={9} lg={9}>
      <p><strong>Price: </strong> {`$${product.price}`}</p>
      <p><strong>Description: </strong>{product.description}</p>
      <form id="new-message-form" onSubmit={props.handleSubmit}>

        <Row className="form-group">
          <Col sm={12} md={4} lg={4}>
            <label htmlFor="quantity">Quantity: </label>
            <input name="quantity" type="text" />
          </Col>
          <Col sm={12} md={2} lg={2}>
            <Button
              bsStyle="primary"
              style={{}}
              type="submit"
              block
            >
              <Glyphicon glyph="plus" />
              <Glyphicon glyph="shopping-cart" />
            </Button>
          </Col>
        </Row>
      </form>
    </Col>
  );
}

const mapStateToProps = function (state, ownProps) {
  return {
    items: state.shoppingCart,
    products: state.products,
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const quantity = +evt.target.quantity.value;
      const item = ownProps.product;
      // item.quantity = Quantity;
      console.log('need to add item', item);
      dispatch(setQuantity(item, quantity));
      evt.target.quantity.value = '';
      // localStorage.setItem("Cart",JSON.stringify(this.state.items));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToCart);
