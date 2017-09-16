import React from 'react';
import axios from 'axios';
// import {Link} from 'react-router-dom';
// import { connect, } from 'react-redux';
// import { getshoppingcart, addshoppingcart, removeshoppingcart, checkoutshoppingcart, } from '../store';
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

        this.setState({
            items: JSON.parse(localStorage.getItem("Cart"))

        })
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
        evt.preventDefault();
        //update product inventory
        //update order table

        const orderInput = {id: this.state.id, price: this.state.Price, quantity: this.state.Quantity}
        axios.post(`/api/order`, orderInput)
            .then(res => res.data)
            .then(data => {
                })

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
                <form onSubmit={(evt)=> this.handleAddItem(evt)}>
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




//
// const Shopping = (props) => {
//     // props.getShoppingCart();
//
//     // let cart = cartTemp;
//     const products = productTemp;
//     // localStorage.setItem("Cart",JSON.stringify(cart))
//     console.log('show localstorage',JSON.parse(localStorage.getItem("Cart")), 'items',props.items);
//     let cart = props.items;
//
// // };
//
//
// /**
//  * CONTAINER
//  */
// const mapState = state => ({
//     name: state.user.name,
//     items: state.shoppingcart.items
// });
//
// const mapDispatch = dispatch => ({
//     handleRemove(itemId,items)  {
//         dispatch(removeshoppingcart(itemId));
//         localStorage.removeItem("Cart");
//         console.log('localStorage remove button click 1',localStorage.getItem("Cart"));
//         localStorage.setItem("Cart",JSON.stringify(items));
//         console.log('localStorage remove button click 2',localStorage.getItem("Cart"));
//     },
//     handleAddItem(evt, items) {
//         const products = productTemp;
//         evt.preventDefault();
//         const itemId = evt.target.product.value;
//         const item = products[itemId-1];
//         item.Quantity = 1;
//         dispatch(addshoppingcart(item));
//         localStorage.removeItem("Cart");
//         localStorage.setItem("Cart",JSON.stringify(items));
//     },
//     handleCheckOut(){
//         //update product inventory
//         //update order table
//         cart = [];
//         localStorage.removeItem('Cart');
//     },
//     handleCheckOut(){
//         cart = [];
//         localStorage.removeItem('Cart');
//     },
//     handleIncrease(itemid) {
//         cart[itemid].Quantity++;
//         localStorage.setItem("Cart",JSON.stringify(cart));
//     },
//     handleDecrease(itemid) {
//         cart[itemid].Quantity--;
//         localStorage.setItem("Cart",JSON.stringify(cart));
//     },
// });
//
// export default connect(mapState, mapDispatch)(Shopping);
