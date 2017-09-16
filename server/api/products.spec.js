/* eslint-env mocha  */
const app = require('../index');
const db = require('../db');
const expect = require('chai').expect;
const { agent } = require('supertest-as-promised');

const Product = db.models.product;
const testRequest = agent(app);


describe('Product routes', () => {
  describe('POST /products', () => {
    let aPreexistingProduct;

    before('clear database', () => db.sync({ force: true }));
    beforeEach('seed db', () => {
      aPreexistingProduct = {
        name: 'whatsit',
        description: 'nifty as hell',
        img_url: 'http://www.imagehoster.com/321',
        price: 10,
        remaining_inventory: 5,
      };
      return Product.create(aPreexistingProduct);
    });

    afterEach('clear table after each spec', () => Product.truncate());

    const newProduct = {
      name: 'widget',
      description: 'super useful',
      img_url: 'http://www.imagehoster.com/123',
      price: 10,
      remaining_inventory: 5,
    };

    it('creates a new product instance with the req.body data', () => testRequest
      .post('/api/products')
      .send(newProduct)
      .expect(201)
    );

    it('does not create duplicate products', () =>
      testRequest
        .post('/api/products')
        .send(aPreexistingProduct)
        .expect(204)

    );
  });
});
