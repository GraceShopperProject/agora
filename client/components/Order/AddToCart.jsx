import React from 'react';
import { connect } from 'react-redux';
import { addProduct, setQuantity } from '../../store';

function AddToCart(props) {
  return (
    <form id="new-message-form" onSubmit={props.handleSubmit}>

      <div className="form-group">
        <label className="col-sm-2 control-label">Add to Cart</label>
        <div className="col-sm-9">
          <div>
            <label htmlFor="quantity"><small>Quantity</small></label>
            <input name="quantity" type="text" />
          </div>

        </div>
        <button className="btn btn-default col-sm-1" type="submit">+</button>
      </div>
    </form>
  );
}

const mapStateToProps = function (state, ownProps) {
  return {
    items: state.shoppingCart,
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const quantity = +evt.target.quantity.value;
      const item = ownProps.product;
      console.log('ROBIN SENDS YOIU THIS', item, quantity);
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
