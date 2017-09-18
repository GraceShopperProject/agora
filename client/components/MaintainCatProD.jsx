import React from 'react';
import {Link} from 'react-router-dom';
import AddProduct from './AddProduct';


export default class MaintainCatProD extends React.Component {

    render() {

        return (
            <div className="container content">
                <div className="col-xs-12">
                    <h1>Admin Product / Category</h1>
                </div>
                <AddProduct />
            </div>
        )
    }
}