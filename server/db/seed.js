const Sequelize = require('sequelize');
const pkg = require('../../package.json');

// create the database instance that can be used in other database files
const name = process.env.DATABASE_NAME || pkg.name;
const connectionString = process.env.DATABASE_connectionString || `postgres://localhost:5432/${pkg.name}`;

// run our models file (makes all associations for our Sequelize objects)
require('./models')

var Promise = require('bluebird');

var db = require('./index')

var { User, Order } = require('./models/index')

var data = {
    users: [
        {email: "nycjing@gmail.com", password: "123456", },
        {email: "nycjing2@gmail.com", password: "123456", },
        {email: "nycjing3@gmail.com", password: "123456", }
    ],
    orders: [
        { status: "Created", },
        { status: "Created", }
    ]
};

db.sync({ force: true })
    .then(function () {
        console.log("Dropped old data, now inserting data");

        const creatingUsers = Promise.each(data.users, function (user) {
            return User.create(user);
        });
        const creatingOrders = Promise.each(data.orders, function (order) {
            return Order.create(order)
            .then( createdOrder => {
                User.findOne() 
                .then( user => {
                    createdOrder.setUser(user)
                })
             });
        });
        
        // TODO
        //const creatingReviews
        //const creatingProducts
        //const creatingReviews

        return Promise.all([creatingUsers]) //Users and Products are independent
            .then(() => {
                console.log('Finished inserting data');

                //Orders: dependent on Users && Reviews: dependent on Products
                return Promise.all([creatingOrders])
                .then(() => {
                    console.log('Finished inserting Orders and TODOReviews');
                }).catch( err => {
                    console.error('Issues with inserting Orders and TODOReviews', err, err.stack)
                });

            })
            .catch(function (err) {
                console.error('There was totally a problem', err, err.stack);
            })
            .finally(function () {
                db.close(); // creates but does not return a promise
                return null; // stops bluebird from complaining about un-returned promise
            });
    })
