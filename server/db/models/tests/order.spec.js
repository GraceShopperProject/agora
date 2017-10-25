/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../../index');

const Order = db.model('order');
const User = db.model('user');

describe('Order model', () => {
  beforeEach(() => db.sync({ force: true }));

  describe('ProperlyDefinedOrders', () => {
    let curUser;
    let curOrder;

    beforeEach(() => {
      return User.create({
        email: 'cody@puppybook.com',
        password: 'bones',
        })
      .then (user => {
        curUser = user
        return Order.create({
          special_instructions: "I have this order",
          status: 'Created',
          price: 1,
        })
      })
      .then (order => {
        order.setUser(curUser);
        curOrder = order;
      })
    })

    it('Ensure proper user is affiliated', () => {
      expect(curOrder.dataValues.userId).to.equal(curUser.dataValues.id);
    });

    it('Ensures proper change in status', () => {
      curOrder.setDataValue('status', 'Processing');
      expect(curOrder.dataValues.status).to.equal('Processing');
    });
  });
});
