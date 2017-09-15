const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
  salt: {
    type: Sequelize.STRING,
  },
  google_id: {
    type: Sequelize.STRING,
  },
  first_name: {
    type: Sequelize.STRING,
  },
  last_name: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  street_address_1: {
    type: Sequelize.STRING,
  },
  street_address_2: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zip: {
    type: Sequelize.STRING,
  },
  is_admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
},
{
  getterMethods: {
    address() {
      return `${this.addLine_1}/n${this.addLine_2}/n${this.addCity}, ${this.addState} ${this.addZipcode}`;
    },
    name() {
      return `${this.first_name} ${this.last_name}`;
    },
  },
}
);

// ---------------  INSTANCE METHODS ----------------------
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password;
};

// ------------------ STATIC METHODS ------------------------
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
  return crypto.createHash('sha1').update(plainText).update(salt).digest('hex');
};

// ------------------------ HOOKS ------------------------------
const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    user.setDataValue('salt', User.generateSalt());
    user.setDataValue('password', User.encryptPassword(user.password, user.salt));
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;
