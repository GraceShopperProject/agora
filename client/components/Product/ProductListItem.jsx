import React from 'react';

export default function ProductListItem({
  name,
  imgUrl,
  price,
}) {
  return (
    <div className="col-sm-6 col-md-4">
      <div className="card" style={{ width: '20rem' }}>
        <img className="card-img-top" src="/img/url" alt="Product Name" />
        <div className="card-body">

          <h4 className="card-title">Product Name</h4>
          <p className="card-text">Short product description</p>
          <p className="card-text">$price</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>

        </div>
      </div>
    </div >
  );
}
