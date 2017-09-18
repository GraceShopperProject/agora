import React from 'react';
import AddToCart from './AddToCart';
import store, { fetchProductCategory } from '../store';
// import {fetchStudents, fetchCourses, fetchHouses ,fetchCoursesStudent,removeCourseStudent } from '../reducers';


export default class ProductDetailpage extends React.Component {
    constructor() {
        super();
        this.state = store.getState();
    }

    componentDidMount () {
        const productId = +this.props.match.params.productId;
        console.log('curent productId',productId, typeof productId)
        // store.dispatch(fetchProductCategory(productId));
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render() {
        const products = this.state.product.products;
        console.log('current state',products);
        const product = products.filter(product => product.id === +this.props.match.params.productId)[0];
        // const productCategory = this.state.ProductCategory
        return (
            <div className="container">
                <h3>{product.name} detail Page</h3>
                <div className="row">
                    {(product) && (
                        <div className="col-lg-6 col-md-6 col-sm-12" key={product.id}>
                            <img src={product.img_url} name={product.name} height="50" width="50" />
                            <li>Price: {product.price}</li>
                            <li>Description: {product.description}</li>
                            {/*<li>Category: {productCategory.name}</li>*/}
                        </div>
                    )}
                    <AddToCart product = {product}/>
                </div>
            </div>

        )}
}
