const Sequelize = require('sequelize');
const db = require('../db');
const Order = require('./order');
const Product = require('./product');

const Order_Product = db.define('order_product', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    }
  },
  quanitity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    }
  },
});

module.exports = Order_Product;
