import React from 'react';
import { connect } from 'react-redux';
import {addshoppingcart} from '../store';

function AddToCart (props) {

    return (
        <form id="new-message-form" onSubmit={props.handleSubmit}>

            <div className="form-group">
                <label className="col-sm-2 control-label">Add to Cart</label>
                <div className="col-sm-9">
                    <div>
                        <label htmlFor="Quantity"><small>Quantity</small></label>
                        <input name="Quantity" type="text" />
                    </div>

                </div>
                <button className="btn btn-default col-sm-1" type="submit">+</button>
            </div>
        </form>
    );
}

const mapStateToProps = function (state, ownProps) {
    return {
        items: state.shoppingcart.items
    };
};

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        handleSubmit (evt) {
            evt.preventDefault();
            const Quantity = +evt.target.Quantity.value;
            const item = ownProps.product;
            item.quantity = Quantity;
            console.log('need to add item',item);
            dispatch (addshoppingcart(item));
            // localStorage.setItem("Cart",JSON.stringify(this.state.items));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddToCart);