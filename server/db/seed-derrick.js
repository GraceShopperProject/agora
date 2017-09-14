

const db = require('./db');
const dummy = require('faker');
const {yellow, red} = require('chalk');

const buildNThings = (n, thingBuilder) => {
  const things = [];
  while (n) {
    things.push(thingBuilder());
    n -= 1;
  }
  return things;
};

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

const buildCategory = () => ({name: dummy.commerce.productMaterial()});

const buildProduct = () => ({
  name: dummy.commerce.product(),
  description: dummy.lorem.paragraphs(),
  imgUrl: dummy.image.technics(),
  price: dummy.commerce.price(),
  remainingInventory: dummy.random.number(),
});

const buildOrder = () => ({
  status: [
    'Created',
    'Processing',
    'Cancelled',
    'Completed',
  ][Math.floor(Math.random() * 4)],
});

const buildReview = () => ({
  text: dummy.lorem.paragraphs(),
  numOfStart: Math.foor(Math.random() * 6),
});


const users = buildNThings(50, buildUser());
const categories = buildNThings
