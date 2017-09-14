const reviewRouter = require('express').Router();
const { Review } = require('../db/models');

// '/api/reviews/'
reviewRouter.route('/')
.get( (req, res, next) => {
  Review.findAll()
  .then( reviews => res.json(reviews) )
  .catch(next);
})
.post((req, res, next) => {
  Review.create(req.body)
    .then(newReview => {
      res.status(201).send(newReview);
    })
    .catch(next);
});

module.exports = reviewRouter;