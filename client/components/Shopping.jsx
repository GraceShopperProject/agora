import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { connect, } from 'react-redux';
import { getshoppingcart, addshoppingcart, removeshoppingcart, checkoutshoppingcart, } from '../store';

/**
 * COMPONENT
 */


const productTemp = [{
        id: 1,
        name: 'Asics Dynamis Running Shoe',
        Desc: 'Women\'s Asics Dynamis Running Shoe - Color: Mid Gray/Glacier Gray/White (Regular Width) - Size: 6.5',
        Price: 160,
    },
    {
        id: 2,
        name: 'Unisex Nike Sungalsses',
        Desc: 'Unisex Nike Vaporwing R - Color: Black/White - Size: NS',
        Price: 390,
    }];

const cartTemp = [{
    id: 2,
    name: 'Unisex Nike Sungalsses',
    Desc: 'Unisex Nike Vaporwing R - Color: Black/White - Size: NS',
    Price: 390,
    Quantity: 1,
}];

const Shopping = (props) => {
        // props.getShoppingCart();

        // let cart = cartTemp;
        const products = productTemp;
        localStorage.setItem("Cart",JSON.stringify(cart))
        // console.log('show localstorage',JSON.parse(localStorage.getItem("Cart")), 'items',props.items);
        let cart = props.items;
        return (
            <div className="container">
                <h3>Your Shopping Cart</h3>
                <table className='table'>
                    <thead>
                    <tr>
                        <th></th>
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
                        cart && cart.map(item => (
                            <tr key={item.id}>
                                <td></td>
                                <td> { item.name } </td>
                                <td>
                                    <span>{ item.Desc }</span>
                                </td>
                                <td>
                                    <span>{ item.Price }</span>
                                </td>
                                <td>
                                    <span>{ item.Quantity }</span>
                                    <input onClick={() => props.handleIncrease(item.id)} type='button' value='+'/>
                                    <input onClick={() => props.handleDecrease(item.id)} type='button' value='-'/>
                                </td>
                                <td>
                                    <input onClick={()=> props.handleRemove(item.id)} type='button' value='x'/>
                                </td>
                                <td>
                                    <span>{ item.Quantity * item.Price }</span>
                                </td>
                            </tr>
                        ))
                    }

                    </tbody>
                </table>
                <form onSubmit={(evt)=> props.handleAddItem(evt, props.items)}>
                    <div className="form-group">
                        <label className="col-sm-1 col-lg-1 col-md-1 control-label">Add Product</label>
                        <div className="col-sm-12 col-lg-12 col-md-12">
                            <select className="form-control" name="product">
                                {
                                    products.map(item => (
                                        <option value={item.id} key={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>

                        </div>
                        <button className="btn btn-default col-sm-1 col-lg-1 col-md-1" type="submit">+</button>
                    </div>
                    <div className="form-group">
                        <input onClick={() => props.handleCheckOut()} type='button' value='Check Out'/>
                        <input onClick={() => props.handleCleanCart()} type='button' value='Clean Cart'/>
                    </div>
                </form>
            </div>
        );
    }
    // };


/**
 * CONTAINER
 */
const mapState = state => ({
    name: state.user.name,
    items: state.shoppingcart.items
});

const mapDispatch = dispatch => ({
    handleRemove(itemId,items)  {
        dispatch(removeshoppingcart(itemId));
        localStorage.removeItem("Cart");
        console.log('localStorage remove button click 1',localStorage.getItem("Cart"));
        localStorage.setItem("Cart",JSON.stringify(items));
        console.log('localStorage remove button click 2',localStorage.getItem("Cart"));
    },
    handleAddItem(evt, items) {
        const products = productTemp;
        evt.preventDefault();
        const itemId = evt.target.product.value;
        const item = products[itemId-1];
        item.Quantity = 1;
        dispatch(addshoppingcart(item));
        localStorage.removeItem("Cart");
        localStorage.setItem("Cart",JSON.stringify(items));
    },
    handleCheckOut(){
        //update product inventory
        //update order table
        cart = [];
        localStorage.removeItem('Cart');
    },
    handleCheckOut(){
        cart = [];
        localStorage.removeItem('Cart');
    },
    handleIncrease(itemid) {
        cart[itemid].Quantity++;
        localStorage.setItem("Cart",JSON.stringify(cart));
    },
    handleDecrease(itemid) {
        cart[itemid].Quantity--;
        localStorage.setItem("Cart",JSON.stringify(cart));
    },
});

export default connect(mapState, mapDispatch)(Shopping);
