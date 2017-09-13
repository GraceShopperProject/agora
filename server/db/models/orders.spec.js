/* global describe beforeEach it */


/*

Incomplete orders.spec file to test the correctness of the orders model.

- Ensure the proper user is affiliated
- Ensure status switching works
- Let Robin know if this test spec is unnecessary :P

*/ 

// const { expect } = require('chai');
// const db = require('../index');

// const Order = db.model('order');
// const User = db.model('user'); //Will need user to affiliate with the order they make

// describe('Order model', () => {
//   beforeEach(() => db.sync({ force: true }));

//   describe('ProperlyDefinedOrders', () => {
//     describe('correctUserAffiliation', () => {
//       let user1;
//       let order1;

//       beforeEach(() => User.create({
//         UserId: 'cody@puppybook.com',
//         password: 'bones',
//       })
//       .then (user => {
//         user1 = user
//       })

//       beforeEach(() => Order.create({
//         UserId: // maybe use email? ,
//         password: 'bones',
//       })
//         .then((order) => {
//           order1 = order;
//         }));

//       it('returns true if the password is correct', () => {
//         expect(cody.correctPassword('bones')).to.be.equal(true);
//       });

//       it('returns false if the password is incorrect', () => {
//         expect(cody.correctPassword('bonez')).to.be.equal(false);
//       });
//     }); // end describe('correctPassword')
//   }); // end describe('instanceMethods')
// }); // end describe('User model')