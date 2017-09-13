const Sequelize = require('sequelize');
const db = require('../db');
// const Review = require('./review')

const Product = db.define('product',{
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    set (name) {
      const capitalizedName = name
        .split(' ')
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(' ');

      this.setDataValue('name',capitalizedName);
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

  imgUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },

  remainingInventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },

  },

});

Product.prototype.isInStock = function () {
  return this.remainingInventory > 0;
};

// TODO: hook this up properly to Reviews model
Product.prototype.calculateAvgUserRating = function () {
  /*   return this.reviews.reduce((aggRating, review, idx, arr) => {
      if (idx === arr.length - 1) {
        return (aggRating + review.rating) / arr.length;
      }
      return aggRating + review.rating;
    }, 0); */
};

module.exports = Product;
