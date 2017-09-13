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
              return user.validate()
                  .then(() => { throw new Error('Promise should have rejected');})
                  .catch(err => {
                      expect(err).to.exist;
                      expect(err).to.be.an('error');
                      expect(err.errors).to.contain.a.thing.with.properties({
                          path: 'email',
                          type: 'notNull Violation'
                      });
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
