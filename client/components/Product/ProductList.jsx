import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import store, {fetchCategoryProducts} from '../../store';
//import Sidebar from '../Layout'; 				<Sidebar />
import { connect } from 'react-redux';

class ProductList extends React.Component {

	render() {
		let productsToRender = this.props.products;
		const isAdmin =  this.props.isAdmin;
		if (this.props.match.params.categoryId) { 
		 	productsToRender = productsToRender.filter(product => {
				return product.categories.find(productCategory => {
					return productCategory.id === +this.props.match.params.categoryId;
				})
			 });
		}

		return (
			<div>

					<div id="page-content-wrapper">
						<div className="container-fluid">
							<div className="container">
								<div className="row">
									{
										(productsToRender) && productsToRender.map(product => (
											<div className="col-lg-6 col-md-6 col-sm-12 tabs" key={product.id}>

												<li>
													<Link to={`/products/${product.id}`}>
														<tr> {product.name} </tr>

														<img src={product.img_url} name={product.name} height="50" width="50"></img>

														<tr>
                                                            {
                                                                isAdmin? product.remaining_inventory :null
                                                            }
														</tr>
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
        isAdmin :  state.user.is_admin
	}
}

export default connect(mapState)(ProductList);