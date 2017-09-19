const orderRouter = require('express').Router();
const { Order, Product, Order_Product } = require('../db/models');

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

  // user_request, total_price, productsList -> all products in the cart
  .post((req, res, next) => {
    Order.create(req.body, {
      include: [{
        association: Product,
        through: Order_Product,
      }],
    })
      .then((newOrder) => {
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
