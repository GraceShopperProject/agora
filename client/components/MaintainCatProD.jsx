import React from 'react';
import {Link} from 'react-router-dom';
import AddProduct from './AddProduct';
import EidtCategory from './EidtCategory';


export default class MaintainCatProD extends React.Component {

    render() {

        return (
            <div className="container content">
                <div className="col-xs-12">
                </div>
                <div className="row">
                    <div className = "col-xs-6 col-md-6 col-lg-6">
                        <AddProduct />
                    </div>
                    <div className = "col-xs-6 col-md-6 col-lg-6">
                        <EidtCategory />
                    </div>
                </div>
            </div>
        )
    }
}