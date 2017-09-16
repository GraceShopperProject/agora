import React from 'react';
import ProductListItem from './ProductListItem';

function ProductList({ products }) {
  return (
    <div className="container">
      <div className="row">
        {products.map(product => <ProductListItem props={product} />)}
      </div>
    </div>
  );
}

