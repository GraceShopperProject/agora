import React, { Component, } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect, } from 'react-redux';
import { fetchUserOrders, } from '../store';


// TODO ? Stay DRY : May be able to reuse this list somewhere else
// Admin see list of all orders? 
// Only one user per order?


const OrdersList = (props) => {

        const userOrders = props.orders.filter(order =>  order.userId === props.user.id);
        console.log('user orders are:', props.orders);
        return (
            <div className="container">
                <h3>Work in Progress Orders List</h3>
                <table className='table'>
                    <thead>
                    <tr>
                        <th>Order Placed</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Shipped To</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        userOrders.length === 0
                            ? (<tr>
															<th>No orders</th>
                            </tr>)
                            : userOrders.map(order => {
                                return (
																	<tr key={order.id}>
																		<th>{order.createdAt}</th>
																		<th>{order.status}</th>
																		<th>{order.total_price}</th>
																		<th>{order.user.name}</th>
																	</tr>
                                )
                            }
                            )
                    }
                    </tbody>
                </table>
            </div>
        );
    };

const mapState = state => {
  return ({
    user: state.user,
    orders: state.orders,
    userOrders : state.userOrders,
})};

const mapDispatch = (dispatch, ownProps) => ({
    userOrders(userId) {
        dispatch(fetchUserOrders(userId))
    }
});

export default connect(mapState, mapDispatch)(OrdersList);