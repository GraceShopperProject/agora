const pkgJSON = require('../../package.json');

const Sequelize = require('sequelize');

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${pkgJSON.name}`,
  {
    logging: false,
    underscore: true,
  }
);

module.exports = db;
