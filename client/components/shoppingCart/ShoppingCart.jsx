import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';
import {
  removeProduct,
  addProduct,
  increaseQuantity,
  decreaseQuantity,
} from '../../store';

function ShoppingCart(props) {
  const { cart, handleRemove, handleIncrease, handleDecrease } = props;
  return (
    <div className="container">
      <h3>Your Shopping Cart</h3>
      <Table responsive>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Remove</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            cart && cart.map((product) => (
              <tr key={product.id}>
                <td />
                <td> {product.name} </td>
                <td>{`$${product.price}`}</td>
                <td>{product.quantity}
                  <Button onClick={() => handleIncrease(product)}>+</Button>
                  <Button onClick={() => handleDecrease(product)}>-</Button>
                </td>
                <td>
                  <Button onClick={() => handleRemove(product)}>X</Button>
                </td>
                <td>{`$${(product.quantity * product.price).toFixed(2)}`}</td>
              </tr>
            ))
          }

        </tbody>
      </Table>
      {cart.length > 0 &&
        <Link to="/checkout">
          <Button>Checkout</Button>
        </Link>
      }
    </div>
  );
}

// ------------------- CONNECT WRAPPER ---------------------

const mapState = state => ({
  cart: state.shoppingCart,
  products: state.products,
});

const mapDispatch = dispatch => ({

  handleAdd: (product) => {
    dispatch(addProduct(product));
  },

  handleRemove: (product) => {
    dispatch(removeProduct(product));
  },

  handleIncrease: (product) => {
    dispatch(increaseQuantity(product));
  },

  handleDecrease: (product) => {
    dispatch(decreaseQuantity(product));
  },
});

export default connect(mapState, mapDispatch)(ShoppingCart);
