import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


// TODO ? Stay DRY : May be able to reuse this list somewhere else
// Admin see list of all orders?
// Only one user per order?


const Category = (props) => {
  const category = props.category;
  console.log('category are:', category);
  return (
    <div className="container">

      <h3>Category List</h3>
      <div className="row">
        {
          (category) && category.map(type => (
            <div className="col-sm-3 col-lg-3 col-md-3" key={type.id}>
              <Link to={`/category/${type.id}`}>
                <h2>{type.name}</h2>
                <img
                  alt={type.name}
                  src={`/img/${type.id}.png`}
                  name={type.name}
                  height="200"
                  width="200"
                />
              </Link>
            </div>
          )
          )
        }
      </div>
    </div>
  );
};

const mapState = state => ({
  category: state.category,
});


export default connect(mapState)(Category);

