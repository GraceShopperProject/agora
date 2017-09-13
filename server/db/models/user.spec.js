/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');

const User = db.model('user');

describe('User model', () => {
  beforeEach(() => db.sync({ force: true }));

      it('has the expected schema definition', () => {
          expect(User.attributes.email).to.be.an('object');
      });

      describe('validations', () => {

          // *Assertion translation*:
          // The `email` column should be a required field.
          it('require email', () => {
              const user = User.build();
              user.validate()
                  .then(() => {
                  throw new Error('Error: Incorrectly validated bad name');}, (err) => {
              expect(err.errors[0].message).to.equal('email cannot be null');
          });

          });
      });

      describe('instanceMethods', () => {
          describe('correctPassword', () => {
            let cody;

            beforeEach(() => User.create({
              email: 'cody@puppybook.com',
              password: 'bones',
            })
              .then((user) => {
                cody = user;
              }));

            it('returns true if the password is correct', () => {
              expect(cody.correctPassword('bones')).to.be.equal(true);
            });

            it('returns false if the password is incorrect', () => {
              expect(cody.correctPassword('bonez')).to.be.equal(false);
            });
        }); // end describe('correctPassword')
    }); // end describe('instanceMethods')
}); // end describe('User model')
