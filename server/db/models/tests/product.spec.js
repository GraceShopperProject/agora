/* eslint-env mocha */

const chai = require('chai');

const expect = chai.expect;
const spies = require('chai-spies');
const Product = require('../product');

chai.use(spies);

describe('Product Model', () => {
  /*   beforeEach('setup invalid product', () => {
      Product.build({
        name: 'Widget',
        description: 'a nifty thing that does stuff',
        img_url: 'http://www.unsplash.com/url/to/image',
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
        img_url: 'http://www.unsplash.com/url/to/image',
        price: 500,
        remaining_inventory: 1000,
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

    it('does not allow img_url to be null', () => {
      validProduct.setDataValue('img_url', null);
      validProduct.validate()
        .then(() => {
          throw new Error('Error: Incorrectly validated bad url');
        }, (err) => {
          expect(err.errors[0].message).to.equal('img_url cannot be null');
        });
    });

    it('requires img_url to be formatted as URL', () => {
      validProduct.setDataValue('img_url', 'invalidUrl');
      validProduct.validate()
        .then(() => {
          throw new Error('Error: Incorrectly validated bad url');
        }, (err) => {
          expect(err.errors[0].message).to.equal('Validation isUrl on img_url failed');
        });
    });

    it('does not allow remaining_inventory to be null', () => {
      validProduct.setDataValue('remaining_inventory', null);
      validProduct.validate()
        .then(() => {
          throw new Error('Error: Incorrectly validated bad remaining_inventory');
        }, (err) => {
          expect(err.errors[0].message).to.equal('remaining_inventory cannot be null');
        });
    });

    it('does not allow remaining_inventory to be less than 0', () => {
      validProduct.setDataValue('remaining_inventory', -1);
      validProduct.validate()
        .then(() => {
          throw new Error('Error: Incorrectly validated bad remaining_inventory');
        }, (err) => {
          expect(err.errors[0].message).to.equal('Validation min on remaining_inventory failed');
        });
    });

    it('instance.isInStock() returns true if remaining_inventory > 0, else false', () => {
      console.log("Robin tests 1 : ", validProduct.isInStock())
      expect(validProduct.isInStock()).to.equal(true);
      validProduct.setDataValue('remaining_inventory', 0);
      console.log("Robin tests 2 : ", validProduct.isInStock())
      expect(validProduct.isInStock()).to.equal(false);
    });

    it('instance.calculateAvgUserRating() returns the average user rating for a product ', () => {
      // expect(typeof validProduct.calculateAvgUserRating()).to.equal('number');
      expect(validProduct.calculateAvgUserRating()).to.equal('the average of all user ratings (FIXME: should be actual number)');
    });
  });
});
