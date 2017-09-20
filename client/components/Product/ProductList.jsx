import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import store, { fetchCategoryProducts, } from '../../store';
import UpdateInventory from '../Admin/UpdateInventory'
// import Sidebar from '../Layout'; 				<Sidebar />
import { connect } from 'react-redux';

function ProductList({
  match,
  products,
  isAdmin,
  categoryId,
}) {
  let productsToRender = products;
  if (match.params.categoryId) {
    productsToRender = productsToRender
      .filter(product => product.categories
        .find(productCategory => productCategory.id === +match.params.categoryId));
  }

  return (
    <div>

      <div id="page-content-wrapper">
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              {
                (productsToRender) && productsToRender.map(product => (
                  <div className="col-lg-4 col-md-4 col-sm-6 tabs" key={product.id}>
                    <div>
                      <Link to={`/products/${product.id}`}>
                        <h3> {product.name} </h3>
                          <img src={product.img_url} name={product.name} height="100" width="100"/>
                      </Link>
                      <div>
                        {
                          isAdmin ? <UpdateInventory product = {product} /> :null
                        }
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapState = state => ({
  products: state.products,
  categories: state.categories,
  isAdmin: state.user.is_admin,
});

export default connect(mapState)(ProductList);
