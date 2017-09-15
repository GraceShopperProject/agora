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
        numOfStars: 5,
        text: 'This thing is great',
      });
    });

    it('numOfStars can not be null', () => {
      validReview.setDataValue('numOfStars', null);
      validReview.validate()
        .then(() => {
          throw new Error('Error: Incorrectly validated numOfStars');
        }, (err) => {
          expect(err.errors[0].message).to.equal('numOfStars cannot be null');
        });
    });

    it('does not allow numOfStars to be > 5', () => {
      validReview.setDataValue('numOfStars', 6);
      validReview.validate()
        .then(() => {
          throw new Error('Error: Incorrectly validated numOfStars');
        }, (err) => {
          expect(err.errors[0].message).to.equal('Validation max on numOfStars failed');
        });
    });

    it('does not allow numOfStars to be less than 1', () => {
      validReview.setDataValue('numOfStars', 0);
      validReview.validate()
        .then(() => {
          throw new Error('Error: Incorrectly validated numOfStars');
        }, (err) => {
          expect(err.errors[0].message).to.equal('Validation min on numOfStars failed');
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
