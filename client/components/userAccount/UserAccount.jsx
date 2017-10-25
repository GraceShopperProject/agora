import React from 'react';
import { Link } from 'react-router-dom';
import OrdersList from '../order/OrdersList';
import EditAccount from './EditAccount';

export default class UserAccount extends React.Component {

	render() {
		return (
			<div className="container content">
				<div className="col-xs-12">
				</div>
				<div className="row">
					<div className="col-xs-6 col-md-6 col-lg-6">
						<EditAccount />
					</div>
					<div className="col-xs-6 col-md-6 col-lg-6">
						<OrdersList />
					</div>
				</div>
			</div>
		)
	}
}