const Sequelize = require('sequelize');
const db = require('../db');
// const User = require('./user');

const Order = db.define('order', {
  user_request: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  status: {
    type: Sequelize.ENUM(['Created', 'Processing', 'Cancelled', 'Completed']),
    allowNull: false,
    defaultValue: 'Created',
  },
  total_price: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
    },
  },
});

// DEFAULT SCOPE: set in models/index.js

module.exports = Order;
