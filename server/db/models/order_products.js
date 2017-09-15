const Sequelize = require('sequelize');
const db = require('../db');

const Order_Product = db.define('order_products', {
  product_price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
    set(val) {
      const amount = typeof val === 'string' ? Number(val) : val;
      this.setDataValue('price', amount * 100);
    },
    get() {
      return this.getDataValue('price') / 100;
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
});

module.exports = Order_Product;
