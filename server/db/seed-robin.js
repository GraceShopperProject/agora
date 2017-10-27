const staticImages = '../../public/images';
const fs = require('fs');
const dummy = require('faker');
const { floor, random } = Math;

const db = require('../db');
const {
  Product,
  User,
  Order,
  Review,
  Category,
} = require('./models');


const makeNThings = (n, creator) => {
  const things = [];
  while (n) {
    const thingCreated = creator();
    things.push(thingCreated);
    n -= 1;
  }
  return things;
};

const categories = [
  { name: 'Elegant' },
  { name: 'Delectable' },
  { name: 'Active' },
  { name: 'Youthful' },
  { name: 'Wild' },
  //{name: "Whimsy"},
];

const randomDescriptions = [
  'This picture of a chair is a chair picture. The only truth in this store.',
  "It's a great chair! Buy it.",
  'Amazing high quality chair should really be purchased by you, a very real and genuine buyer.',
  "Let me tell you about this chair. It's a chair with upholstery.",
  "Chair.",
  '"A chair is a piece of furniture with a raised surface supported by legs, commonly used to seat a single person. Chairs are supported most often by four legs and have a back; however, a chair can have three legs or can have a different shape." - Wikipedia',
  'Functional chair.',
  'You can sit in it! So can your friends!'
]

// used with generating Products
const categoryLookup = {
  elegant: 1,
  delectable: 2,
  active: 3,
  youthful: 4,
  wild: 5,
};

/*
  Generates Product array utilizing the public/static_assets folder
  Any image file that has the category name as the first word will be used
  
  'delectable_dining_chair_six.jpeg' will be given:
    name: "Dining Chair Six"
    category: "Delectable"
    img_url: 'delectable_dining_chair_six.jpeg'

  'agora_chair.jpg' will be ignored; it does not pass the valid category in categoryLookup
*/
const products = [];
fs.readdirSync('./public/static_assets').forEach(file => {
  const fileWords = file.split('_');
  if (categoryLookup[fileWords[0]] !== undefined) { // first element is category name
    const name = fileWords.slice(1).map((word, index) => {
      //if (index > 0) { // not the category name
        const cleanWord = word.split('.')[0]; // deletes any .jpg or .jpeg
        return (cleanWord[0].toUpperCase() + cleanWord.slice(1)); // Sets product name to capital case
      //}
    }).join(' ');
    products.push({
      name,
      img_url: file,
      description: randomDescriptions[floor(random() * randomDescriptions.length)],
      price: Number(dummy.finance.amount(0, 1000, 2)),
      remaining_inventory: 100,
      categoryId: categoryLookup[fileWords[0]],
    })
  }
});

const makeUser = () => {
  const name = dummy.name.firstName();
  const emailDomain = dummy.internet.email().split('@')[1];
  return {
    name,
    email: `${name}@${emailDomain}`,
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

const users = makeNThings(10, makeUser, ['email']);

users.push({
  name: "rw",
  email: "rw@rw.rw",
  is_admin: false,
  password: "rw",
  phone: "(555) 555-5555",
  street_address_1: "111 RW St",
  street_address_2: "Apt RW",
  city: "RW City",
  state: "RW State",
  zip: "RW Zip",
})

users.push({
  name: "jj",
  email: "jj@jj.jj",
  is_admin: true,
  password: "jj",
  phone: "(555) 555-5555",
  street_address_1: "111 jj St",
  street_address_2: "Apt jj",
  city: "jj City",
  state: "jj State",
  zip: "jj Zip",
})

const makeOrder = () => ({
  status: [
    'Created',
    'Processing',
    'Cancelled',
    'Completed',
  ][floor(random() * 4)],
  special_instructions: dummy.lorem.paragraph(),
  total_price: 100,
  confirmation_email: 'me@you.com',
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
      }))); // TODO doesnt work currently
  }));

// const createReviewForEveryPurchase = () =>
//   Order.findAll()
//     .then((orders) => {
//       const promisedSetOfReviewPerOrder = orders.map((order) => {
//         const { user, products } = order;
//         const promisedReviews = products.map((product) => {
//           const creatingReview = Review.create({
//             text: dummy.lorem.paragraphs(),
//             rating: floor(random() * 5) + 1,
//             user,
//             products,
//           }, {
//               returning: true,
//             });
//           return creatingReview
//             .then(createdReview => createdReview.setUser(user))
//             .then(reviewWithUser => reviewWithUser.setProduct(product));
//         });
//         return Promise.all(promisedReviews);
//       });
//       return Promise.all(promisedSetOfReviewPerOrder);
//     });

db.sync({ force: true })
  .then(() => console.log('Dropping tables'))
  .then(() => console.log('Seeding Database'))

  // CREATE CATEGORIES
  .then(() => Promise.all(categories.map(category => Category.create(category))))
  // CREATE PRODUCTS
  .then(() => Promise.all(products.map(product => Product.create(product, {
    returning: true,
    // include: [Category],
  }).then(newProduct => {
    Category.findOne({ where: { id: product.categoryId } })
      .then(category => {
        newProduct.setCategories(category)
      })
    return newProduct;
  })))
    // CREATE USERS
    .then((allProducts) => {
      console.log(allProducts);
      const promiseForAllUsers = Promise.all(users.map(user => User.create(user, {
        returning: true,
      })));
      return Promise.all([allProducts, promiseForAllUsers]);
    })

    // CREATE ORDERS
    .then(([allProducts, allUsers]) => {
      const promiseForAllOrders = createNOrders(10);
      return Promise.all([allProducts, allUsers, promiseForAllOrders]);
    })

    // SET ASSOCIATIONS BETWEEN INSTANCES
    .then(([allProducts, allUsers, allOrders]) =>
      associateEveryOrderToAUser(allOrders, allUsers)
        .then(allOrdersWithUser =>
          associateRandomProductsToEachOrder(allProducts, allOrdersWithUser)
        )
    )
    .then(() => console.log('Database successfully seed!'))
    .then(() => db.close())
    .then(() => console.log('Database connection closed'))
    .catch(err => console.error('UNSUCCESSFUL: ', err)));
