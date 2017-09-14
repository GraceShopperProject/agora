const productRouter = require('express').Router();
const Product = require('../db/models').Product;

// For any variable attached after /products/:XX 
// Looks up XX product and attaches product to req.product for future routes
productRouter.param('id', (req, res, next, id) => {
  Product.findOne({ where: { id } })
    .then((product) => {
      req.product = product;
    })
    .catch(next);
});

productRouter.route('/')
  .get((req, res, next) => {
    Product.findAll({})
      .then(res.json.bind(res))
      .catch(next);
  })
  .post((req, res, next) => {
    const maybeNewProduct = Product.build(req.body).get({ plain: true });
    delete maybeNewProduct.id;
    Product.findOrCreate({ where: maybeNewProduct })
      .then(([product, wasCreated]) => {
        if (wasCreated) return res.status(201).json(product);
        return res.sendStatus(204);
      })
      .catch(next);
  });


productRouter.route('/:id')
  .get((req, res) => res.json(req.product))
  .put((req, res, next) => {
    req.product.update(req.body, { returning: true })
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

module.exports = productRouter;
