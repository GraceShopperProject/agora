import React from 'react';
import { Link } from 'react-router-dom';
import store, { getUsers, upgradeUser } from '../../store';
import { connect } from 'react-redux';
import axios from 'axios';

class EditUsers extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			users: []
		};
	}

	componentDidMount() {
		axios.get('/api/users/')
			.then((res) => {
				this.setState({ users: res.data })
			})
		this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
	}

	componentWillUnmount() {
		this.unsubscribe();
	}


	render() {
		const users = this.state.users;
		console.log('who are those users', users);
		return (
			<div className="container content">
				<h3>User List</h3>
				{
					users && users.map(user => (
						<div key={user.id}>
							<div className="col-sm-6 col-md-6 col-lg-6">
								<li>
									<Link value={user.id} to={`/users/${user.id}`}>{user.email} </Link>
									<input className="col-cm-5" onClick={() => this.props.handleUpgradeUser(user.id)}
										type='button' value='upgrade to admin' />
								</li>
							</div>
						</div>
					))
				}
			</div>
		)
	}
}

const mapState = state => ({
	users: state.users,
});

const mapDispatch = (dispatch, ownProps) => ({

	handleUpgradeUser(userId) {
		console.log('this one will be an Admin', userId);
		dispatch(upgradeUser(userId));
	}

});

export default connect(mapState, mapDispatch)(EditUsers);