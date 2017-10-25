import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UpdateInventory from '../Admin/UpdateInventory';
import TileGridFeed from '../Common/TileGridFeed';
import ProductCard from './ProductCard';

const ProductCardsFeed = ({products}) => {

  const renderProducts = () => {
    return products.map(product => {
      return <ProductCard key={product.id} {...{product}} />;
    });
  };

  return (
    <TileGridFeed>
      {renderProducts()}
    </TileGridFeed>
  );
};


export default ProductCardsFeed;
