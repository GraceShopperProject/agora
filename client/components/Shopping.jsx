import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { connect, } from 'react-redux';
/**
 * COMPONENT
 */

const cartTemp = [{
        id: 1,
        name: 'Asics Dynamis Running Shoe',
        Desc: 'Women\'s Asics Dynamis Running Shoe - Color: Mid Gray/Glacier Gray/White (Regular Width) - Size: 6.5',
        Price: 160,
        Quantity: 1,
    },
    {
        id: 2,
        name: 'Unisex Nike Sungalsses',
        Desc: 'Unisex Nike Vaporwing R - Color: Black/White - Size: NS',
        Price: 390,
        Quantity: 1,
    }];
export const Shopping = (props) => {
    const { name, } = props;
    const cart = cartTemp;
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
                                </td>
                                <td>
                                    <input onClick={()=> Shopping.handleRemove(item.id)} type='button' value='x'/>
                                </td>
                                <td>
                                    <span>{ item.Quantity * item.Price }</span>
                                </td>
                            </tr>
                        ))
                    }

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
