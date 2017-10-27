const Sequelize = require('sequelize');
const db = require('../db');
// const Review = require('./review')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    set(name) {
      const capitalizedName = name
        .split(' ')
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(' ');

      this.setDataValue('name', capitalizedName);
    },
  },

  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
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

  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },

  img_url: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  remaining_inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },

  },

}, {
  paranoid: true,
});

Product.prototype.isInStock = function () {
  return this.remainingInventory > 0;
};

module.exports = Product;
