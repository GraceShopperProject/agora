

const db = require('./db');
const {
  Product,
  User,
  Order,
  Review,
  Category,
} = require('./models');

const dummy = require('faker');

const {floor, random} = Math;

const makeNThings = (n, creator, uniques) => {
  const things = [];
  while (n) {
    const thingCreated = creator();
    /*     const isNotDuplicate = uniques.every(attribute => things.every(thing =>
          thing[attribute] !== thingCreated[attribute]
        ));
        if (isNotDuplicate) {
          console.log('not duplicate'); */
    things.push(thingCreated);
    n--;
  }
  // }
  return things;
};


const makeCategory = () => ({
  name: dummy.commerce.productMaterial(),
});

const categories = makeNThings(20, makeCategory, ['name']);


const makeProduct = () => ({
  name: dummy.commerce.product(),
  img_url: dummy.image.technics(),
  description: dummy.lorem.paragraphs(),
  price: 100,
  remaining_inventory: 100,
  // categories: [categories[floor(random() * categories.length)]],
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
  rating: floor(Math.random() * 6),
  // productId: products[Math.floor(Math.random() * products.length)].id,
  product: reviewedProduct,
});


const makeUser = (reviewedProducts) => {
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
    streetAddress: dummy.address.streetAddress(),
    streetAddress2: dummy.address.secondaryAddress(),
    city: dummy.address.city(),
    state: dummy.address.state(),
    zip: dummy.address.zipCode(),
    reviews: reviewedProducts.map(product => makeReview(product)),
  };
};

// const users = makeNThings(50, makeUser, ['email']);

// const creatingUsers = Promise.all(users.map(user => User.create(user)));

const makeOrder = (user, productsOrdered) => ({
  status: [
    'Created',
    'Processing',
    'Cancelled',
    'Completed',
  ][floor(random() * 4)],
  user_request: dummy.lorem.paragraph(),
  total_price: 100 /* productsOrdered.reduce((total, product) => total + product.price, 0) */,
  user,
  productsOrdered,
});

const createNOrders = (n) => {
  const ordersCreated = [];
  while (n) {
    const smaller = floor(random() * products.length);
    const bigger = floor((random() * (products.length - smaller))) + smaller;
    const randProducts = products.slice(smaller, bigger);
    const randUser = users[floor(random() * users.length)];
    const newUser = makeUser(randProducts);
    const creatingOrder = Order.create(
      makeOrder(newUser, randProducts), {
        include: [
          {
            association: Order.Products,
            // through: 'order_products',
            // include: [Product.Categories],
          },
          {
            association: Order.User,
            include: [User.Reviews],
          },
        ],
      }/* , { returning: true }) */);

    ordersCreated.push(creatingOrder);
    n--;
  }
  return Promise.all(ordersCreated);
  // simultaneously creates all users, products, orders, and reviews
};


// const reviews = makeNThings(1000, makeReview);

db.sync({force: true})
  .then(() => console.log('Dropping tables'))
  .then(() => console.log('Seeding Database'))
  .then(() => createNOrders(50))
  // .then(createdOrders => createdOrders.map((order) => {
  //   const smaller = floor(random() * products.length);
  //   const bigger = floor((random() * (products.length - smaller))) + smaller;
  //   const randProducts = products.slice(smaller, bigger);
  //   return order.addProducts(randProducts);
  // }))
  // .then(() => Promise.all(products.map(product => Product.create(product))))
  // .then(() => Promise.all(users.map(user => User.create(user))))
  .then(() => console.log('Database successfully seed!'))
  .then(() => db.close())
  .then(() => console.log('Database connection closed'))
  .catch(err => console.error('UNSUCCESSFUL: ', err));
