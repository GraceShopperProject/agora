const chai = require('chai');

const expect = chai.expect;
const spies = require('chai-spies');
const {Product} = require('../models/product');

chai.use(spies);
