import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { connect, } from 'react-redux';
/**
 * COMPONENT
 */
export const Shopping = (props) => {
    const { name, } = props;
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

                    </tbody>
                </table>
            </div>
        );
    };

/**
 * CONTAINER
 */
const mapState = state => ({
    // email: state.user.email,
    name: state.user.name
});

export default connect(mapState)(Shopping);
