const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE // TODO is this necessary? 
    }
  },
  customizeOrderMessage: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  status: {
    type: Sequelize.ENUM([Created, Processing, Cancelled, Completed]),
    allowNull: false
  }
});

module.exports = Order;
