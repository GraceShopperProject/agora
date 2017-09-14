const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');

const Order = db.define('order', {
  user_order_message: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  status: {
    type: Sequelize.ENUM(['Created', 'Processing', 'Cancelled', 'Completed']),
    allowNull: false,
    defaultValue: 'Created',
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    }
  }
});

module.exports = Order;
