const router = require('express').Router();
const { Order } = require('../db/models');

router.get('/', (req, res, next) => {
  Order.findAll() // TODO add a default scope to have the user assigned come with it?
    .then(orders => res.json(orders))
    .catch(next);
});