const Sequelize = require('sequelize');
const db = require('../db');
// const User = require('./user');

const Order = db.define('order', {

  special_instructions: {
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
    set(val) {
      const amount = typeof val === 'string' ? Number(val) : val;
      this.setDataValue('total_price', amount * 100);
    },
    get() {
      return this.getDataValue('total_price') / 100;
    },
  },
  confirmation_email: {
    type: Sequelize.STRING
  }
  // *** TODO *** address stuff here
});

// DEFAULT SCOPE: set in models/index.js

module.exports = Order;
