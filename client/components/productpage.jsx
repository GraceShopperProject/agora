import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import store from '../store';
import Sidebar from './sidebar';

export default class Productpage extends React.Component {
    constructor() {
        super();
        this.state = store.getState();
    }

    componentDidMount() {
        const categoryId = this.props.match.params.categoryId;
        console.log(categoryId)

        axios.get(`/api/products/category/${categoryId}`)
            .then(res => {
                console.log(res.data);
                console.log('products from the category',res.data);
                return res.data
            })
            .then(data => {
                this.setState({
                    products: data.products
                })
            });
    }

    render() {
        const products = this.state.products;
        //const category = this.store.category.map(type => type.id === this.props.match.params.categoryId);
        return (
					<div>
						<Sidebar />
						<div id="page-content-wrapper">
							<div className="container-fluid">
									<h3>category product Page</h3>
									<div className="row">
											{/*<div className="col-lg-6 col-md-6 col-sm-12" key={category.id}>*/}
													{/*<h3>{category.name}</h3>*/}
													{/*<img src={`/img/${category.name}.jpg`} name={category.name} height="300" width="300"/>*/}
											{/*</div>*/}
											<h3>Product List</h3>
											{
													(products) && products.map(product => (
																	<div className="col-lg-6 col-md-6 col-sm-12" key={product.id}>
																			<li>{product.name}</li>
																	</div>
															)
													)
											}
									</div>
							</div>
						</div>
					</div>
				)
    }
}