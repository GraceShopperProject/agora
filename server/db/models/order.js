const Sequelize = require('sequelize');
const db = require('../db');
// const User = require('./user');

const Order = db.define('order', {
  // Don't think this is necessary – Derric
  // date: {
  //   type: Sequelize.DATE,
  //   allowNull: false,
  //   defaultValue: Sequelize.NOW,
  // },
  customizeOrderMessage: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  status: {
    type: Sequelize.ENUM(['Created', 'Processing', 'Cancelled', 'Completed']),
    allowNull: false,
  },
});

module.exports = Order;
