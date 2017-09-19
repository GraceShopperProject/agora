import React from 'react';
import {Link} from 'react-router-dom';
import EditUser from './EditUser';
import EidtOrder from './EidtOrder';

export default class MaintainUser extends React.Component {

    render() {

        return (
            <div className="container content">
                <div className="col-xs-12">
                </div>
                <div className="row">
                    <div className = "col-xs-6 col-md-6 col-lg-6">
                        <EidtOrder />
                    </div>
                    <div className = "col-xs-6 col-md-6 col-lg-6">
                        <EditUser />
                    </div>
                </div>
            </div>
        )
    }
}