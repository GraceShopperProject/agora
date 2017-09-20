const router = require('express').Router();
const { User } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email'],
  })
    .then(users => res.json(users))
    .catch(next);
});

router.post('/update', (req, res, next) => {
    console.log('input data',req.body)
    User.findById(+req.body.id)
        .then(user=>{
          user.update({
              'name': req.body.name,
              'phone': req.body.phone,
              'email': req.body.email,
          },{ returning: true})
        })
        .then((user)=>{res.json(user)})
        .catch(next);
});

