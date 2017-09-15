

const db = require('../db');
const {
  Product,
  User,
  Order,
  Review,
  Category,
  Order_Product,
} = require('./models');

const dummy = require('faker');

const { floor, random } = Math;

const makeNThings = (n, creator) => {
  const things = [];
  while (n) {
    const thingCreated = creator();
    things.push(thingCreated);
    n -= 1;
  }
  return things;
};


const makeCategory = () => ({
  name: dummy.commerce.productMaterial(),
});

const categories = makeNThings(20, makeCategory);


const makeProduct = () => ({
  name: dummy.commerce.product(),
  img_url: dummy.image.technics(),
  description: dummy.lorem.paragraphs(),
  price: dummy.finance.amount(0, 1000, 2),
  remaining_inventory: 100,
  categories: [categories[floor(random() * categories.length)]],
});

const products = makeNThings(100, makeProduct);

// const createReview = () => Review.create({
//   text: dummy.lorem.paragraphs(),
//   rating: floor(random() * 5) + 1,
// });

const makeUser = () => {
  const first_name = dummy.name.firstName();
  const last_name = dummy.name.lastName();
  const emailDomain = dummy.internet.email().split('@')[1];
  return {
    first_name,
    last_name,
    email: `${first_name + last_name}@${emailDomain}`,
    is_admin: dummy.random.boolean(),
    password: dummy.internet.password(),
    google_id: dummy.random.uuid(),
    phone: dummy.phone.phoneNumber(),
    street_address_1: dummy.address.streetAddress(),
    street_address_2: dummy.address.secondaryAddress(),
    city: dummy.address.city(),
    state: dummy.address.state(),
    zip: dummy.address.zipCode(),
  };
};

const users = makeNThings(50, makeUser, ['email']);

const makeOrder = () => ({
  status: [
    'Created',
    'Processing',
    'Cancelled',
    'Completed',
  ][floor(random() * 4)],
  user_request: dummy.lorem.paragraph(),
  total_price: 100, // TODO: need to make a beforeValidate hook to set this
});

const createNOrders = (n) => {
  const ordersCreated = [];
  while (n) {
    const creatingOrder = Order.create(makeOrder(), { returning: true });
    ordersCreated.push(creatingOrder);
    n -= 1;
  }
  return Promise.all(ordersCreated);
};


const associateEveryOrderToAUser = (allOrders, allUsers) =>
  Promise.all(allOrders
    .map((order) => {
      const randUser = allUsers[floor(random() * users.length)];
      return order
        .setUser(randUser);
    })
  );

const associateRandomProductsToEachOrder = (allProducts, allOrders) =>
  Promise.all(allOrders.map((order) => {
    const maxQuantity = allProducts.length > 10 ? 10 : 2;
    const smaller = floor(random() * maxQuantity);
    const bigger = floor((random() * (maxQuantity - smaller))) + smaller;
    const randProducts = allProducts.slice(smaller, bigger);
    return Promise.all(randProducts.map(product =>
      order.addProduct(product, {
        through: { quantity: 1, product_price: product.price },
      })));
  }));

const createReviewForEveryPurchase = () =>
  Order.findAll()
    .then((orders) => {
      const promisedSetOfReviewPerOrder = orders.map((order) => {
        const { user, products } = order;
        const promisedReviews = products.map((product) => {
          const creatingReview = Review.create({
            text: dummy.lorem.paragraphs(),
            rating: floor(random() * 5) + 1,
            user,
            products,
          }, {
            returning: true,
          });
          return creatingReview
            .then(createdReview => createdReview.setUser(user))
            .then(reviewWithUser => reviewWithUser.setProduct(product));
        });
        return Promise.all(promisedReviews);
      });
      return Promise.all(promisedSetOfReviewPerOrder);
    });

db.sync({ force: true })
  .then(() => console.log('Dropping tables'))
  .then(() => console.log('Seeding Database'))

  // CREATE PRODUCTS WITH CATEGORIES
  .then(() => Promise.all(products.map(product => Product.create(product, {
    returning: true,
    include: [Category],
  }))))

  // CREATE USERS
  .then((allProducts) => {
    const promiseForAllUsers = Promise.all(users.map(user => User.create(user, {
      returning: true,
    })));
    return Promise.all([allProducts, promiseForAllUsers]);
  })

  // CREATE ORDERS
  .then(([allProducts, allUsers]) => {
    const promiseForAllOrders = createNOrders(500);
    return Promise.all([allProducts, allUsers, promiseForAllOrders]);
  })

  // SET ASSOCIATIONS BETWEEN INSTANCES
  .then(([allProducts, allUsers, allOrders]) =>
    associateEveryOrderToAUser(allOrders, allUsers)
      .then(allOrdersWithUser =>
        associateRandomProductsToEachOrder(allProducts, allOrdersWithUser)
      )
  )
  .then(() => createReviewForEveryPurchase())
  .then(() => console.log('Database successfully seed!'))
  .then(() => db.close())
  .then(() => console.log('Database connection closed'))
  .catch(err => console.error('UNSUCCESSFUL: ', err));
