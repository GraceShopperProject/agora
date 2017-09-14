

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

const makeNThings = (n, creator, uniques) => {
  const things = [];
  while (n) {
    const thing = creator();
    const isNotDuplicate = uniques.every(attribute => !thing[attribute]);
    if (isNotDuplicate) {
      things.push(thing);
      n -= 1;
    }
  }
  return things;
};


const makeCategory = () => ({
  name: dummy.commerce.productMaterial(),
});

const categories = makeNThings(20, makeCategory, ['name']);


const makeProduct = () => ({
  name: dummy.commerce.product(),
  description: dummy.lorem.paragraphs(),
  price: dummy.random.number({ min: 1, max: 1000, precision: 2 }),
  remainingInventory: dummy.random.number({ min: 0, max: 1000, precision: 0 }),
  categories: [categories[floor(random() * categories.length)]],
});

const products = makeNThings(100, makeProduct);

// const creatingProducts = Promise.all(
//   products.map(product =>
//     Product.create(product, {
//       include: [{ association: Product.Categories }],
//     })
//   )
// );

const makeReview = reviewedProduct => ({
  text: dummy.lorem.paragraphs(),
  numOfStars: Math.foor(Math.random() * 6),
  // productId: products[Math.floor(Math.random() * products.length)].id,
  product: reviewedProduct,
});


const makeUser = (reviewedProducts) => {
  const firstName = dummy.name.firstName();
  const lastName = dummy.name.lastName();
  const emailDomain = dummy.internet.email().split('@')[1];
  return {
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
    reviews: reviewedProducts.map(product => makeReview(product)),
  };
};

const users = makeNThings(50, makeUser, ['email']);

// const creatingUsers = Promise.all(users.map(user => User.create(user)));

const makeOrder = (user, productsOrdered) => ({
  status: [
    'Created',
    'Processing',
    'Cancelled',
    'Completed',
  ][floor(random() * 4)],
  user_request: dummy.lorem.paragraph(),
  total_price: productsOrdered.reduce((total, product) => total + product.price),
  user,
  productsOrdered,
});

const createNOrders = (n) => {
  const ordersCreated = [];
  while (n) {
    const smaller = floor(random() * products.length);
    const bigger = floor((random() * products.length) - smaller) + smaller;
    const randProducts = products.slice(smaller, bigger);
    // const randUser = users[floor(random() * users.length)];
    const newUser = makeUser(randProducts);
    const creatingOrder = Order.create(
      makeOrder(newUser, randProducts), {
        include: [
          {
            association: Order.Products,
            include: [Product.Categories],
          },
          {
            association: Order.User,
            include: [User.Reviews],
          },
        ],
      });

    ordersCreated.push(creatingOrder);
  }
  return Promise.all(ordersCreated);
  // simultaneously creates all users, products, orders, and reviews
};


// const reviews = makeNThings(1000, makeReview);

db.sync({ force: true })
  .then(() => console.log('Dropping tables'))
  .then(() => console.log('Seeding Database'))
  .then(() => createNOrders(500))
  .then(() => console.log('Database successfully seed!'))
  .then(() => db.close())
  .then(() => console.log('Database connection closed'))
  .catch(err => console.error('UNSUCCESSFUL: ', err));
