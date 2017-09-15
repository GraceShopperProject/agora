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
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0,
    },
  },

  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },

  img_url: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
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
