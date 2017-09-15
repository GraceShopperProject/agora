import React, { Component, } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect, } from 'react-redux';
import { fetchOrders, } from '../store/orders';


// TODO ? Stay DRY : May be able to reuse this list somewhere else
// Admin see list of all orders? 
// Only one user per order?

export class OrdersList extends Component {
  
  componentDidMount () {
    this.props.fetchOrders();
  }
  
  render () { 
    const { name, } = props;
        return (
            <div className="container">
                <h3>Work in Progress Orders List</h3>
                <table className='table'>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Total Price</th>
                        <th>Price</th>
                        <th>First Product Id</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                      <tr> 
                        {
                          this.props.orders.map( order => {
                            return (
                              <th>
                                order.id
                              </th>
                            );
                          })
                        }
                      </tr> 
                    </tbody>
                </table>
            </div>
        );
    };
  }
// will need to check which user is logged in
const mapState = state => ({
    // userId? 
    user: state.user,
    orders: state.orders // state.orders.find(order => order.userId === currentUserId) // unless is an Admin
});

const mapDispatch = (dispatch, ownProps) => ({

  fetchOrders() {
    dispatch(fetchOrders());
  }
  // cancelOrderEvent(event) {
  //   dispatch()
  // }

});

export default connect(mapState, )(OrdersList);
