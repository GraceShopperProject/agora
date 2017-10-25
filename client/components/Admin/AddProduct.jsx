import React from 'react';
import axios from 'axios';
import store, { fetchCategories, fetchProducts, addNewProductToStore } from '../../store/index';
import { connect } from 'react-redux';
import { Form } from '../common';

class AddProduct extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			price: 0,
			description: '',
			img_url: '',
			remaining_inventory: 1,
			categoryId: -1,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(evt) {
    evt.preventDefault();
    let name = evt.target.name;
		const value = evt.target.value;
		if (name === 'category') {
			name = 'categoryId'
		}
    this.setState({ [name]: value, });
	}

	handleSubmit(evt) {
		evt.preventDefault();
		const newProduct = {...this.state};
		this.props.addNewProductToStore(newProduct);
		this.setState({
			name: '',
			price: 0,
			description: '',
			img_url: '',
			remaining_inventory: 1,
			categoryId: -1,
		});
	}

	render() {
		const formItems = {...this.state, category: this.props.categories};
		delete formItems['categoryId'];
		return (
			<div className="container">
				<Form title="Add a Product" submitText="Submit" handleChange={this.handleChange} onSubmit={(evt) => this.handleSubmit(evt)} formItems={formItems} />
			</div>
		)
	}
}

const mapState = state => {
	return {
		categories: state.categories,
	}
}

const mapDispatch = dispatch => {
	return {
		addNewProductToStore: (newProduct) => {
			dispatch(addNewProductToStore(newProduct));
		}
	}
}

export default connect(mapState, mapDispatch)(AddProduct);