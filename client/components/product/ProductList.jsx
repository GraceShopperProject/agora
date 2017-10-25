import React from 'react';
import { connect } from 'react-redux';
import ProductCardsFeed from './ProductCardsFeed';

const ProductList = props => {
  const {
    match: {params: {categoryId}},
    products,
  } = props;

  const productsToRender = categoryId
    ? products
      .filter(product => product.categories
        .find(category => category.id === +categoryId))
    : products;

  return (
    <ProductCardsFeed products={productsToRender} />
  );
};

const mapState = state => ({
  products: state.products,
  categories: state.categories,
});

export default connect(mapState)(ProductList);
