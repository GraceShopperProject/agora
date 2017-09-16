import React from 'react';
import axios from 'axios';
// import {Link} from 'react-router-dom';
// import { connect, } from 'react-redux';
import { me, getshoppingcart, addshoppingcart, removeshoppingcart, checkoutshoppingcart, } from '../store';
//
/**
 * COMPONENT
 */

export default class ShoppingCart extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            products: [],
            category: [],
            id: 0,
            name: '',
            ddescription: '',
            price: 0,
            quantity: 1,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleCheckOut = this.handleCheckOut.bind(this);
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleCleanCart = this.handleCleanCart.bind(this);
    }

    componentDidMount() {
        let olditems = [];
        if (localStorage.getItem("Cart") !== null)
            olditems = JSON.parse(localStorage.getItem("Cart"));
        this.setState({
            items: olditems
        });

        axios.get('/api/products/')
            .then(res => res.data)
            .then(data => this.setState({products:data}));
        axios.get('/api/category')
            .then(res => res.data)
            .then(data => {
                this.setState({category:data})
            });
        console.log('AFTER update',this.state);
    }

    handleChange (evt) {
        const value = evt.target.value;
        console.log(value)
        this.setState({
            [evt.target.name]: value
        });
    }

    handleAddItem(evt) {
        evt.preventDefault();
        const itemId = evt.target.product.value;
        const item = this.state.products[itemId-1];
        item.quantity = 1;
        console.log('before add the state.items',this.state.items);
        this.setState({items : this.state.items.concat(item)});
        localStorage.removeItem("Cart");
        localStorage.setItem("Cart",JSON.stringify(this.state.items));
    }

    handleRemove(itemId)  {
        this.setState({items : this.state.items.filter(item=> item.id !== itemId)});
        localStorage.removeItem("Cart");
        localStorage.setItem("Cart",JSON.stringify(this.state.items));
    }

    handleIncrease(itemId) {
        this.state.items[itemId].quantity++;
        this.setState({items: this.state.items});
        localStorage.removeItem("Cart");
        localStorage.setItem("Cart",JSON.stringify(this.state.items));
    }

    handleDecrease(itemId) {
        this.state.items[itemId].quantity--;
        if (this.state.items[itemId].quantity === 0) this.state.items.splice(itemId,1);
        this.setState({items: this.state.items});
        localStorage.removeItem("Cart");
        localStorage.setItem("Cart",JSON.stringify(this.state.items));
    }

    handleCheckOut(){
        // evt.preventDefault();
        //update product inventory
        //update order table
        console.log(this.state.items);
        // const orderInput = {id: this.state.id, price: this.state.Price, quantity: this.state.Quantity}
        // axios.post(`/api/order`, orderInput)
        //     .then(res => res.data)
        //     .then(data => {
        //         })
        axios.post('/api/products/orderUpdate/',this.state.items )
            .then(res => res.data)
            .then(data => console.log(data));

        this.setState ({
                items: [],
                id: 0,
                name: '',
                description: '',
                price: 0,
                quantity: 1,
            });
        localStorage.removeItem('Cart');
    }
    handleCleanCart(){
        this.setState ({
            items: [],
            id: 0,
            name: '',
            description: '',
            price: 0,
            quantity: 1,
        });
        localStorage.removeItem('Cart');
    }

    render() {
        console.log('current local staorage',JSON.parse(localStorage.getItem("Cart")));
        const cart = this.state.items;
        console.log('cart length',cart);
        const products = this.state.products;
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
                        cart && cart.map((item,idx) => (
                            <tr key={item.id}>
                                <td></td>
                                <td> { item.name } </td>
                                <td>
                                    <span>{ item.description }</span>
                                </td>
                                <td>
                                    <span>{ item.price }</span>
                                </td>
                                <td>
                                    <span>{ item.quantity }</span>
                                    <input onClick={() => this.handleIncrease(idx)} type='button' value='+'/>
                                    <input onClick={() => this.handleDecrease(idx)} type='button' value='-'/>
                                </td>
                                <td>
                                    <input onClick={()=> this.handleRemove(item.id)} type='button' value='x'/>
                                </td>
                                <td>
                                    <span>{ item.quantity * item.price }</span>
                                </td>
                            </tr>
                        ))
                    }

                    </tbody>
                </table>
                <form onSubmit={this.handleAddItem}>
                    <div className="form-group">
                        <label className="col-sm-1 col-lg-1 col-md-1 control-label">Add Product</label>
                        <div className="col-sm-12 col-lg-12 col-md-12">
                            <select className="form-control" name="product">
                                {
                                    products && products.map(item => (
                                        <option value={item.id} key={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>

                        </div>
                        <button className="btn btn-default col-sm-1 col-lg-1 col-md-1" type="submit">+</button>
                    </div>
                    <div className="form-group">
                        <input onClick={() => this.handleCheckOut()} type='button' value='Check Out'/>
                        <input onClick={() => this.handleCleanCart()} type='button' value='Clean Cart'/>
                    </div>
                </form>
            </div>
        );
    }
}
