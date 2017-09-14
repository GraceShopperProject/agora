

const db = require('./db');
const {
  Product,
  User,
  Order,
  Review,
  Category,
} = require('./models');

const dummy = require('faker');

const { floor, random } = Math;

const pushNThingsIntoArray = (n, thingMaker, uniques) => {
  const things = [];
  while (n) {
    const thing = thingMaker();
    const isNotDuplicate = uniques.every(attribute => !thing[attribute]);
    if (isNotDuplicate) {
      things.push(thing);
      n -= 1;
    }
  }
  return things;
};


const buildCategory = () => ({ name: dummy.commerce.productMaterial() });
const categories = pushNThingsIntoArray(20, buildCategory, ['name']);
console.log(categories);


const buildProduct = () => Product.create({
  name: dummy.commerce.product(),
  description: dummy.lorem.paragraphs(),
  price: dummy.random.number({ min: 1, max: 1000, precision: 2 }),
  remainingInventory: dummy.random.number({ min: 0, max: 1000, precision: 0 }),
  categories: [categories[floor(random() * categories.length)]],
}, {
  include: [{
    association: Product.Categories,
  }],
});

const products = pushNThingsIntoArray(100, buildProduct);


const buildOrder = () => ({
  status: [
    'Created',
    'Processing',
    'Cancelled',
    'Completed',
  ][Math.floor(Math.random() * 4)],
});

const buildReview = () => ({
  productId: products[Math.floor(Math.random() * products.length)].id,
  text: dummy.lorem.paragraphs(),
  numOfStars: Math.foor(Math.random() * 6),
});

const reviews = pushNThingsIntoArray();

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

const users = pushNThingsIntoArray(50, buildUser);
