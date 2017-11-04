import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store, {
  me,
  removeProduct,
  addProduct,
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
  resetCart,
} from '../../store';
import history from '../../history';

//
/**
 * COMPONENT
 *
 */

// TODO change variable names "items" to products in cart



// *** TODO *** Render shopping cart from the redux shopping cart store
// Window.onBeforeUnload()


function ShoppingCart({
  history,
  cart,
  products,
  handleAdd,
  handleRemove,
  handleIncrease,
  handleDecrease,
  handleCheckOut,
  handleCleanCart,
}) {
  return (
    <div className="container">
      <h3>Your Shopping Cart</h3>
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Remove</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            cart && cart.map((product, idx) => (
              <tr key={product.id}>
                <td />
                <td> {product.name} </td>
                <td>
                  <span>{product.description}</span>
                </td>
                <td>
                  <span>{product.price}</span>
                </td>
                <td>
                  <span>{product.quantity}</span>
                  <input
                    onClick={() => handleIncrease(product)}
                    type="button"
                    value="+"
                  />
                  <input
                    onClick={() => handleDecrease(product)}
                    type="button"
                    value="-"
                  />
                </td>
                <td>
                  <input onClick={() => handleRemove(product)} type="button" value="x" />
                </td>
                <td>
                  <span>{(product.quantity * product.price).toFixed(2)}</span>
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>

      <form onSubmit={(evt) => {
        evt.preventDefault();
        handleAdd(products.find(aProduct => aProduct.id === +evt.target.product.value));
      }}

      >
        <div className="form-group">
          <label
            htmlFor="product-options"
            className="control-label"
          >
            Add Product
          </label>
          <div className="col-sm-12 col-lg-12 col-md-12">
            <select
              id="product-options"
              className="form-control"
              name="product"
            >
              {
                products && products.map(product => (
                  <option
                    value={product.id}
                    key={product.id}
                  >
                    {product.name}
                  </option>
                ))
              }
            </select>

          </div>
          <button className="btn btn-default" type="submit">+</button>
        </div>
        <div className="form-group">
          {cart.length &&
            <Link to="/checkout">
              <button className="btn">
                Checkout
              </button>
            </Link>
          }
          <input onClick={evt => handleCheckOut(evt)} type="button" value="Check Out" />

          <input onClick={evt => handleCleanCart(evt)} type="button" value="Clean Cart" />

        </div>
      </form>
    </div>
  );
}

// ------------------- HELPERS ---------------------------

const handleCheckOut = (evt) => {
  // STEPS
  // Next page collect user information
  // Submits
  //		Sends order to database =>
  //			- Creates Order puts in totalPrice, special_instructions in order
  //			- Creates Order-Product associations productId, orderId, price, quantity
  //

  evt.preventDefault();
  history.push('/checkout');
};

const handleCleanCart = (evt) => {
  evt.preventDefault();

  localStorage.removeItem("Cart");
};


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

  handleCheckOut,
  handleCleanCart,
});

export default connect(mapState, mapDispatch)(ShoppingCart);
