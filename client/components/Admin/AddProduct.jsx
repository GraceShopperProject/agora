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

	componentDidMount() {
		console.log("categories from store are: ", this.props.categories)
		//this.props.loadInitialState();
		// this.setState({
		// 	categories: this.props.categories
		// })
	}

	handleChange(evt) {
    evt.preventDefault();
    let name = evt.target.name;
		const value = evt.target.value;
		console.log(name, value);
		if (name === 'category') {
			console.log("category is", value);
			name = 'categoryId'
		}
    this.setState({ [name]: value, });
	}

	handleSubmit(evt) {
		evt.preventDefault();
		const newProduct = {...this.state};
		console.log('newProduct in AddProduct', newProduct);
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
		console.log("AddProduct formItemsAre:", formItems);
		return (
			<div className="container">
				<Form title="Add a Product" submitText="Submit" handleChange={this.handleChange} onSubmit={(evt) => this.handleSubmit(evt)} formItems={formItems} />
			</div>
		)
	}
}

const mapState = state => {
	console.log(state);
	return {
		categories: state.categories,
	}
}

const mapDispatch = dispatch => {
	return {
		loadInitialState: () => {
			dispatch(fetchCategories());
		},
		// updateProducts: () => {
		// 	dispatch(fetchProducts()); 
		// },
		addNewProductToStore: (newProduct) => {
			dispatch(addNewProductToStore(newProduct));
		}
	}
}

export default connect(mapState, mapDispatch)(AddProduct);

{/* <h3>Add a product</h3>
				<form onSubmit={this.handleSubmit}>
					<section>
						<div className="form-group">
							<label className="col-sm-2 col-md-2 col-lg-2 control-label">Name</label>
							<div className="col-sm-10 col-md-10 col-lg-10">
								<input name="name" type="text" className="form-control" value={this.state.name} required onChange={this.handleChange} />
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-2 col-md-2 col-lg-2 control-label">Price</label>
							<div className="col-sm-10 col-md-10 col-lg-10">
								<input name="price" type="text" className="form-control" value={this.state.price} required onChange={this.handleChange} />
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-2 control-label">Description</label>
							<div className="col-sm-10">
								<input name="description" type="text" className="form-control" value={this.state.description} onChange={this.handleChange} />
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-2 control-label">Inventory</label>
							<div className="col-sm-10">
								<input name="remaining_inventory" type="text" className="form-control" value={this.state.dremaining_inventory} onChange={this.handleChange} />
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-2 control-label">Img_url</label>
							<div className="col-sm-10">
								<input name="img_url" type="text" className="form-control" value={this.state.img_url} onChange={this.handleChange} />
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-2 control-label">Category</label>
							<div className="col-sm-10">
								<select className="form-control" name="category" value={this.state.category} onChange={this.handleChange}>
									{
										categories && categories.map(category => (
											<option value={category.id} key={category.id}>{category.name}</option>
										))

									}
								</select>
							</div>
						</div>
						<div className="col-sm-offset-2 col-sm-10">
							<button type="submit" className="btn btn-primary">submit</button>
						</div>
					</section>

				</form> */}