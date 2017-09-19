import React from 'react';
import {Link} from 'react-router-dom';


export default class EditOrder extends React.Component {

    render() {

        return (
            <div className="container content">
                <div className="col-xs-12">
                    <Link to="/main">
                        <h3>EditOrder</h3>
                        <img src="/img/market2.jpg" height="300" width="300"/>
                    </Link>
                </div>
            </div>
        )
    }
}