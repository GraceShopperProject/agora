import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import store, {fetchCategoryProducts} from '../store';
import Sidebar from './sidebar';

export default class Productpage extends React.Component {
	constructor() {
		super();
		this.state = store.getState();
	}
	componentDidMount() {
		const categoryId = +this.props.match.params.categoryId;
		console.log('current category',categoryId)
		store.dispatch(fetchCategoryProducts(categoryId));
		this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
	}

	componentWillUnmount () {
		this.unsubscribe();
	}

	render() {
		const products = this.state.product.products;
		const category = this.state.category.filter(type => type.id === +this.props.match.params.categoryId)[0];
		console.log('current category', category);
		return (
			<div>
				<Sidebar />
					<div id="page-content-wrapper">
						<div className="container-fluid">
							<div className="container">
								<h3>{category.name} product Page</h3>
								<div className="col-lg-6 col-md-6 col-sm-12" key={category.id}>
									<img src={`/img/${category.id}.png`} name={category.name} height="200" width="200"/>
								</div>
								<br></br>
								<div className="row">
									{
										(products) && products.map(product => (
											<div className="col-lg-6 col-md-6 col-sm-12" key={product.id}>
												<li>
													<Link to={`/products/${product.id}`}>
														{product.name}
														<img src={product.img_url} name={product.name} height="50" width="50">
														</img>
													</Link>
												</li>
											</div>
										))
									}
								</div>
							</div>
						</div>
					</div>
				</div>
		)
	}
}