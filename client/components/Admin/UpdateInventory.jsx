import React from 'react';
import { connect } from 'react-redux';
import store, { updateInventory, fetchProducts } from '../../store';

class UpdateInventroy extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			...this.props,
			Quantity: 0,
			Price: 0,
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		store.dispatch(fetchProducts());
		this.setState({
			Quantity: this.state.product.product.remaining_inventory,
			Price: this.state.product.product.price,
		});
	}

	handleChange(evt) {
		evt.preventDefault();
		const value = evt.target.value;
		console.log(value)
		this.setState({
			[evt.target.name]: value
		});
	}

	render() {
		const product = this.state.product.product;
		const remaining_inventory = product.remaining_inventory;
		const price = product.price
		console.log('current state', this.state);
		return (
			<form id="new-message-form" onSubmit={this.props.handleSubmit}>

				<div className="form-group">
					<div className="col-sm-6" key={product.id}>
						<div>
							<label>
								<small>Inventory</small>
							</label>
							<input name="Quantity" value={this.state.Quantity} type="text"
								onChange={this.handleChange} />
							<label>
								<small>Price</small>
							</label>
							<input name="Price" value={this.state.Price} type="text"
								onChange={this.handleChange} />
						</div>
					</div>
					<button className="btn btn-default col-sm-3" type="submit">Update</button>
				</div>
			</form>
		);
	}
}

const mapStateToProps = function (state, ownProps) {
	return {
		product: ownProps,
	};
};

const mapDispatchToProps = function (dispatch, ownProps) {
	return {

		handleSubmit(evt) {
			evt.preventDefault();
			const item = ownProps.product;
			item.price = +evt.target.Price.value
			item.new_inventory = +evt.target.Quantity.value;
			console.log('need to update the product', item);
			dispatch(updateInventory(item));

		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UpdateInventroy);