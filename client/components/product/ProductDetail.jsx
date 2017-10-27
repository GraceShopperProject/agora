import React from 'react';
import AddToCart from '../order/AddToCart';
import store, { fetchProductCategory } from '../../store';
import { connect } from 'react-redux';
import Image from 'react-bootstrap/lib/Image';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';

const ProductDetailPage = (props) => {
  const products = props.products;
  const product = products && products.filter(product => +product.id === +props.match.params.productId)[0];
  return (
    <div className="container">
      <h3>{product && product.name} detail Page</h3>
      <div className="row">
        {product && (
          <div className="col-lg-6 col-md-6 col-sm-12" key={product.id}>
              <Image src={`/images/${product.img_url}`} name={product.name} height="200" width="200" />
            <li>Price: {product.price}</li>
            <li>Description: {product.description}</li>
            {/* <li>Category: {productCategory.name}</li>*/}
          </div>
        )}
        <AddToCart product ={product} />
      </div>
    </div>

  );
};


const mapState = state => {
  return ({
    products: state.products,
  });
 };


export default connect(mapState)(ProductDetailPage);
