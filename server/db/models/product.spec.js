/* eslint-env mocha */

const chai = require('chai');

const expect = chai.expect;
const spies = require('chai-spies');
const Product = require('../models/product');

chai.use(spies);

describe('Product Model', () => {
  /*   beforeEach('setup invalid product', () => {
      Product.build({
        name: 'Widget',
        description: 'a nifty thing that does stuff',
        imgUrl: 'http://www.unsplash.com/url/to/image',
        price: 500,
        quantity: 1000,
      });
    }); */

  describe('attribute validations using .validate()', () => {
    let validProduct;
    beforeEach('setup valid product', () => {
      validProduct = Product.build({
        name: 'my nifty widget',
        description: 'a nifty thing that does stuff',
        imgUrl: 'http://www.unsplash.com/url/to/image',
        price: 500,
        remainingInventory: 1000,
      });
    });

    it('does not allow name to be null', () => {
      validProduct.setDataValue('name', null);
      validProduct.validate()
        .then(() => {
          throw new Error('Error: Incorrectly validated bad name');
        }, (err) => {
          expect(err.errors[0].message).to.equal('name cannot be null');
        });
    });

    it('formats name to title case', () => {
      expect(validProduct.name).to.equal('My Nifty Widget');
    });

    it('does not allow price to be null', () => {
      validProduct.setDataValue('price', null);
      validProduct.validate()
        .then(() => {
          throw new Error('Error: Incorrectly validated bad price');
        }, (err) => {
          expect(err.errors[0].message).to.equal('price cannot be null');
        });
    });

    it('does not allow price to be less than 0', () => {
      validProduct.setDataValue('price', -1);
      validProduct.validate()
        .then(() => {
          throw new Error('Error: Incorrectly validated bad price');
        }, (err) => {
          expect(err.errors[0].message).to.equal('Validation min on price failed');
        });
    });

    it('does not allow description to be null', () => {
      validProduct.setDataValue('description', null);
      validProduct.validate()
        .then(() => {
          throw new Error('Error: Incorrectly validated bad description');
        }, (err) => {
          expect(err.errors[0].message).to.equal('description cannot be null');
        });
    });

    it('does not allow imgUrl to be null', () => {
      validProduct.setDataValue('imgUrl', null);
      validProduct.validate()
        .then(() => {
          throw new Error('Error: Incorrectly validated bad url');
        }, (err) => {
          expect(err.errors[0].message).to.equal('imgUrl cannot be null');
        });
    });

    it('requires imgUrl to be formatted as URL', () => {
      validProduct.setDataValue('imgUrl', 'invalidUrl');
      validProduct.validate()
        .then(() => {
          throw new Error('Error: Incorrectly validated bad url');
        }, (err) => {
          expect(err.errors[0].message).to.equal('Validation isUrl on imgUrl failed');
        });
    });

    it('does not allow remainingInventory to be null', () => {
      validProduct.setDataValue('remainingInventory', null);
      validProduct.validate()
        .then(() => {
          throw new Error('Error: Incorrectly validated bad remainingInventory');
        }, (err) => {
          expect(err.errors[0].message).to.equal('remainingInventory cannot be null');
        });
    });

    it('does not allow remainingInventory to be less than 0', () => {
      validProduct.setDataValue('remainingInventory', -1);
      validProduct.validate()
        .then(() => {
          throw new Error('Error: Incorrectly validated bad remainingInventory');
        }, (err) => {
          expect(err.errors[0].message).to.equal('Validation min on remainingInventory failed');
        });
    });

    it('.isInStock() returns true if remainingInventory > 0, else false', () => {
      expect(validProduct.isInStock()).to.equal(true);
      validProduct.setDataValue('remainingInventory', 0);
      expect(validProduct.isInStock()).to.equal(false);
    });
  });
});
