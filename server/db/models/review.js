const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  numOfStars: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 5,
      min: 1
    }
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: true
  },
});

module.exports = Review;
