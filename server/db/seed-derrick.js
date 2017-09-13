

const db = require('./db');
const dummy = require('faker');
const {yellow,red} = require('chalk');

const buildUser = () => {
  const firstName = dummy.name.firstName();
  const lastName = dummy.name.lastName();
  const emailDomain = dummy.internet.email().split('@')[1];
  return {
    firstName,
    lastName,
    email: `${firstName + lastName}@${emailDomain}`,
    isAdmin: !!Math.round(Math.random() * 2),
    password: dummy.internet.password(),
    googleId: dummy.random.uuid(),
    phone: dummy.phone.phoneNumer(),
    streetAddress: dummy.address.streetAddress(),
    streetAddress2: dummy.address.secondaryAddress(),
    city: dummy.address.city(),
    state: dummy.address.state(),
    zip: dummy.address.zipCode(),
  };
};

const buildNUsers = (n) => {
  const users = [];
  while (n) {
    users.push(buildUser());
    n -= 1;
  }
  return users;
};

const buildCategory = () => {
  return {name: dummy.}
};

const buildNCategories = (n) => {

};

const buildProduct = () => {

};

const buildNProducts = (n) => {

};

const buildOrder = () => {

};

const buildNOrders = (n) => {

};

const buildReview = () => {

};

const buildNReviews = (n) => {

};
