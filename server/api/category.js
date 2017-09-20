const categoryRouter = require('express').Router();
const Category = require('../db/models').Category;
const Product = require('../db/models').Product;

categoryRouter.param('id', (req, res, next, id) => {
  Category.findOne({ where: { id } })
    .then((category) => {
      req.category = category;
    })
    .catch(next);
});

categoryRouter.route('/')
  .get((req, res, next) => {
    Category.findAll({})
      .then(res.json.bind(res))
      .catch(next);
  })
  .post((req, res, next) => {
    const maybeNewCategory = Category.build(req.body).get({ plain: true });
    delete maybeNewCategory.id;
    Category.findOrCreate({ where: maybeNewCategory })
      .then(([category, wasCreated]) => {
        if (wasCreated) return res.status(201).json(category);
        return res.json(category);
      })
      .catch(next);
  });

categoryRouter.route('/:id')
  .get((req, res) => res.json(req.category))
  .put((req, res, next) => {
    req.category.update(req.body, { returning: true })
      .then((updatedCategory) => {
        res.status(201).json(updatedCategory);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    req.category.destroy()
      .then(() => {
        // res.send('recorde deleted');
        res.sendStatus(204)
      })
      .catch(next);
  });

categoryRouter.route('/products/:productId')
    .get((req, res, next) => {
        Product.findById(req.params.productId)
            .then((product) => {
                console.log('want to see the join table', product);
                return product.getCategory();
            })
            .then((category)=>{
                res.json({category})
            })
            .catch(next);
    });

categoryRouter.route('/:categoryId/delete')
    .delete((req, res, next) => {
        Category.destroy({
            where: {
                id: +req.params.categoryId
            }
        })
            .then((rowDeleted) => {
                if(rowDeleted === 1){
                console.log('Deleted successfully');
                res.sendStatus(204)
                }
        })
            .catch(next);
    });


module.exports = categoryRouter;
