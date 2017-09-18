import React, { Component, } from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import { connect, } from 'react-redux';


// TODO ? Stay DRY : May be able to reuse this list somewhere else
// Admin see list of all orders?
// Only one user per order?


const Sidebar = (props) => {
    const category = props.categories
    return (
      <div id="wrapper">
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            {
              category && category.map(type=>
                (
                  <li key={type.id}>
                    <Link to={`/category/${type.id}`}>{type.name}</Link>
                  </li>
                )
              )
            }
          </ul>
        </div>
      </div>
    );
};

const mapState = state => {
  return ({
    categories: state.categories,
  })};

export default connect(mapState)(Sidebar);



