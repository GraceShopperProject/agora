import React from 'react';
import { connect } from 'react-redux';
import Image from 'react-bootstrap/lib/Image';
import Row from 'react-bootstrap/lib/Row';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import AddToCart from '../order/AddToCart';
import store, { fetchProductCategory } from '../../store';


const ProductDetail = (props) => {
  console.log(props);
  const products = props.products;
  const product = products && products.filter(product => +product.id === +props.match.params.productId)[0];
  return (
    <div className="container">
      <h2>{product && product.name}</h2>
      <Grid>
        <Row>
          {
            product && (
              <Col sm={12} md={3} lg={3} key={product.id}>
                <div style={{ width: '100%' }}>
                  <Image src={`/images/${product.img_url}`} name={product.name} maxHeight="100%" width="100%" />
                </div>
              </Col>
            )}
          <AddToCart product={product} />
        </Row>
      </Grid>
    </div>
  );
};


const mapState = state => {
  return ({
    products: state.products,
  });
};


export default connect(mapState)(ProductDetail);
