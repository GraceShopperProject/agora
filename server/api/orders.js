const orderRouter = require('express').Router();
const { Order, Product, Order_Products } = require('../db/models');

orderRouter.param('id', (req, res, next, id) => {
  Order.findOne({ where: { id } })
    .then((order) => {
      req.order = order;
    })
    .catch(next);
});

orderRouter.route('/')
  .get((req, res, next) => {
    Order.findAll()
      .then(orders => res.json(orders))
      .catch(next);
  })

  // special_instructions, total_price, productsList -> all products in the cart
  .post((req, res, next) => {
    const userId = req.body.userId === "" ? -1 : req.body.userId;
    const {special_instructions, total_price, confirmation_email, products, } = req.body;
    console.log("userReq:", special_instructions, "price:", total_price, "confemail", confirmation_email);
    Order.create({special_instructions, total_price, confirmation_email, })
      .then((newOrder) => {
        let productAssociationsArray = products.map(product => {
             return Order_Products.create({ orderId: newOrder.id, productId: product.id, quantity: product.quantity, product_price: product.price});
        })
        Promise.all(productAssociationsArray)
        .then((arr) => {
        })
        .catch(err => console.log(err));
        res.status(201).send(newOrder);
      })
      .catch(next);
  });

orderRouter.route('/:id')
  .get((req, res) => res.json(req.order))
  .put((req, res, next) => {
    req.order.update(req.body, { returning: true })
      .then((updatedProduct) => {
        res.status(201).json(updatedProduct);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    req.product.destroy()
      .then(() => res.sendStatus(204))
      .catch(next);
  });


module.exports = orderRouter;
