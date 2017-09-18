const orderProductsRouter = require('express').Router();
const { Order_Product } = require('../db/models');

orderProductsRouter.param('orderId', (req, res, next, id) => {
  Order_Product.findAll({ where: { orderId } })
  .then(productsInOrder => {
    req.productsInOrder = productsInOrder;
  })
  .catch(next);
});

// '/api/orderproducts/'
orderProductsRouter.route('/')
.get((req, res, next) => { // TESTING PURPOSES ONLY never a use case for this... except admin
  Order_Product.findAll()
    .then(orders => res.json(orders))
    .catch(next);
})
.post((req, res, next) => {
  Order_Product.create(req.body)
    .then(addedProductToOrder => {
      res.status(201).send(addedProductToOrder);
    })
    .catch(next);
});

orderProductsRouter.route('/:orderId')
.get((req, res) => res.json(req.productsInOrder))
// .put((req, res, next) => {
//   req.order.update(req.body, { returning: true })
//   .then((updatedProduct) => {
//     res.status(201).json(updatedProduct);
//   })
//   .catch(next);
// })
// .delete((req, res, next) => {
//   req.product.destroy()
//     .then(()  => res.sendStatus(204))
//     .catch(next);
// })




module.exports = orderProductsRouter;