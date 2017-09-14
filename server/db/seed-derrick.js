

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

const createNPromisedThings = (n, creator, uniques) => {
  const things = [];
  while (n) {
    const thing = creator();
    const isNotDuplicate = uniques.every(attribute => !thing[attribute]);
    if (isNotDuplicate) {
      things.push(Promise.resolve(thing));
      n -= 1;
    }
  }
  return Promise.all(things);
};


const createCategory = () => Category.create({
  name: dummy.commerce.productMaterial(),
});
const creatingCategories = createNPromisedThings(20, createCategory, ['name']);


const createProduct = () => Product.create({
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

const creatingProducts = createNPromisedThings(100, createProduct);
creatingProducts
  .then(products => products.forEach)

const createUser = () => {
  const firstName = dummy.name.firstName();
  const lastName = dummy.name.lastName();
  const emailDomain = dummy.internet.email().split('@')[1];
  return User.create({
    firstName,
    lastName,
    email: `${firstName + lastName}@${emailDomain}`,
    isAdmin: dummy.random.boolean(),
    password: dummy.internet.password(),
    googleId: dummy.random.uuid(),
    phone: dummy.phone.phoneNumer(),
    streetAddress: dummy.address.streetAddress(),
    streetAddress2: dummy.address.secondaryAddress(),
    city: dummy.address.city(),
    state: dummy.address.state(),
    zip: dummy.address.zipCode(),
  });
};

const creatingUsers = createNPromisedThings(50, createUser, ['email']);

const createOrder = () => Order.create({
  status: ['Created', 'Processing', 'Cancelled', 'Completed'][floor(random() * 4)],
  customizeOrderMessage: dummy.lorem.paragraph(),
});

const creatingOrders = createN;

const buildReview = () => ({
  productId: products[Math.floor(Math.random() * products.length)].id,
  text: dummy.lorem.paragraphs(),
  numOfStars: Math.foor(Math.random() * 6),
});

const creatingReviews = createNPromisedThings();
