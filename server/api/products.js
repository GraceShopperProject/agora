const productRouter = require('express').Router();
const Product = require('../db/models').Product;
const Category = require('../db/models').Category;
var Promise = require('bluebird');

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

          product = {
              name: req.body.name,
              price: req.body.price,
              img_url: req.body.img_url,
              description: req.body.description,
              remaining_inventory: req.body.remaining_inventory
          };
          console.log(product);

          var newProduct = Product.build(product);
          newProduct.save()
              .then(()=> {
                  newProduct.addCategory(req.body.category);
                  res.json(newProduct)
              })
              .catch(next)

    //
    // const maybeNewProduct = Product.build(req.body).get({ plain: true });
    // delete maybeNewProduct.id;
    // Product.findOrCreate({ where: maybeNewProduct })
    //   .then(([product, wasCreated]) => {
    //     if (wasCreated) return res.status(201).json(product);
    //     return res.sendStatus(204);
    //   })
    //   .catch(next);
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


productRouter.route('/category/:categoryId')
    .get((req, res, next) => {
        Category.findById(req.params.categoryId)
            .then((category) => {
                console.log('want to see the join table', category);
                return category.getProducts();
            })
            .then((products)=>{
                res.json({products})
            })
            .catch(next);
        });

productRouter.route('/orderUpdate')
    .post((req, res, next) => {
        const updateProducts = Promise.each(req.body, function (item) {
        Product.findOne({ where: { id: item.id } })
            .then((product) => {
                const new_inventory = product.remaining_inventory - item.quantity;
                return product.update({
                    'remaining_inventory': new_inventory
                },{ returning: true})
            })
        });

        return Promise.all([updateProducts])
            .then(() => {
                res.send(' inventory changed');
            }).catch( err => {
                console.error('Issues with updating inventory', err, err.stack)
            });
    });


module.exports = productRouter;
