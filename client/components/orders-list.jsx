import React, { Component, } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect, } from 'react-redux';
import { fetchOrders, } from '../store/orders';


// TODO ? Stay DRY : May be able to reuse this list somewhere else
// Admin see list of all orders? 
// Only one user per order?

class OrdersList extends Component {
  
  componentDidMount () {
    this.props.fetchOrders();
  }
  
  render () { 

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
                        this.props.orders.length === 0 
                        ? (<tr><th>No orders</th></tr>)
                        :  this.props.orders.map( order => {
                            return (
                              <tr key={order.id}>
                                <th>{order.createdAt}</th>
                                <th>{order.status}</th>
                                <th>{order.total_price}</th>
                                <th>{order.user.name}</th>
                              </tr> 
                            )}
                          )
                      }
                    </tbody>
                </table>
            </div>
        );
    };
  }

const mapState = state => {
  return ({
    user: state.user,
    orders: state.orders
})};

const mapDispatch = (dispatch, ownProps) => ({

  fetchOrders() {
    dispatch(fetchOrders());
  }

});

export default connect(mapState, mapDispatch)(OrdersList);



