const Sequelize = require('sequelize');
const db = require('../db');
const Order = require('./order');
const Product = require('./product');

const OrderProduct = db.define('order_product', {
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

module.exports = OrderProduct;
