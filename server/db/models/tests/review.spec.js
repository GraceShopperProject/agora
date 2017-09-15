/* eslint-env mocha */

const chai = require('chai');

const expect = chai.expect;
const spies = require('chai-spies');
const Review = require('../review');

chai.use(spies);

describe('Review Model', () => {

  describe('attribute validations using .validate()', () => {
    let validReview;
    beforeEach('setup valid review', () => {
      validReview = Review.build({
        rating: 5,
        text: 'This thing is great',
      });
    });

    it('rating can not be null', () => {
      validReview.setDataValue('rating', null);
      validReview.validate()
        .then(() => {
          throw new Error('Error: Incorrectly validated rating');
        }, (err) => {
          expect(err.errors[0].message).to.equal('rating cannot be null');
        });
    });

    it('does not allow rating to be > 5', () => {
      validReview.setDataValue('rating', 6);
      validReview.validate()
        .then(() => {
          throw new Error('Error: Incorrectly validated rating');
        }, (err) => {
          expect(err.errors[0].message).to.equal('Validation max on rating failed');
        });
    });

    it('does not allow rating to be less than 1', () => {
      validReview.setDataValue('rating', 0);
      validReview.validate()
        .then(() => {
          throw new Error('Error: Incorrectly validated rating');
        }, (err) => {
          expect(err.errors[0].message).to.equal('Validation min on rating failed');
        });
    });

/*
    it('allows null review text', () => {
      validReview.setDataValue('text', null);
      validReview.validate()
        .then(() => {
          expect(Review.attributes.text).to.be(null);
        })
    });
*/

  });
});
