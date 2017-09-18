import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import store, {fetchCategoryProducts} from '../store';
import Sidebar from './sidebar';
import { connect } from 'react-redux';

class ProductsList extends React.Component {

	componentDidMount() {
		if (this.props.match.params.categoryId)	this.setState({curCategoryId: +this.props.match.params.categoryId});
	}

	render() {
		const productsToRender = this.state.products;

		if (this.state.curCategoryId) { 
			const curCategory = this.state.categories.find(category => category.id === this.state.curCategoryId);
			productsToRender = productsToRender.filter(product => {
				product.category.find(productCategory => {
					productCategory.id === curCategory
				})
			 !== -1});
		}

		return (
			<div>
				<Sidebar />
					<div id="page-content-wrapper">
						<div className="container-fluid">
							<div className="container">
								<div className="row">
									{
										(productsToRender) && productsToRender.map(product => (
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

const mapState = state => {
	return {
		products: state.products,
		categories: state.categories,
		curCategoryId: null,
	}
}

export default connect(mapState, mapDispatch)(ProductsList);