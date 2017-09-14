/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');

const Order = db.model('order');
const User = db.model('user'); 

describe('Order model', () => {
  beforeEach(() => db.sync({ force: true }));

  describe('ProperlyDefinedOrders', () => {
    describe('correctUserAffiliation', () => {
      let user1;
      let order1;

      beforeEach(() => {
        return User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
          })
        .then (user => {
          user1 = user
          return Order.create({
            customizeOrderMessage: "I have this order",
            status: 'Created',
            price: 1,
          })
        })
        .then (order => {
          order.setUser(user1);
          order1 = order;
        })
      })

      it('Ensure proper user is affiliated', () => {
        expect(order1.dataValues.userId).to.equal(user1.dataValues.id);
      });

      it('Ensures proper change in status', () => {
        order1.setDataValue('status', 'Processing');
        expect(order1.dataValues.status).to.equal('Processing');
      });
    });
  }); 
});