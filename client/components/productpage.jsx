import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import store from '../store';

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
        console.log(this.state, );
        const category = this.state.category.filter(type => type.id === +this.props.match.params.categoryId)[0];
        console.log('current category', category);
        return (
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

                            )
                        )
                    }
                </div>
            </div>
        )
    }
}