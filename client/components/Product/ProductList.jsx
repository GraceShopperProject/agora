import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import store, { fetchCategoryProducts } from '../../store';
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
                  <div className="col-lg-6 col-md-6 col-sm-12 tabs" key={product.id}>

                    <li>
                      <tr> {product.name} </tr>
                      <Link to={`/products/${product.id}`}>

                        <img src={product.img_url} name={product.name} height="50" width="50" />

                      </Link>
                      <tr>
                        {
                          isAdmin ? product.remaining_inventory : null
                        }
                      </tr>
                    </li>
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
