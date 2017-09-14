const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
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
});

module.exports = Category;
