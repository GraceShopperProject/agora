const Sequelize = require('sequelize');
const pkg = require('../../package.json');

const name = process.env.DATABASE_NAME || pkg.name;
const connectionString = process.env.DATABASE_connectionString || `postgres://localhost:5432/${pkg.name}`;



// create the database instance that can be used in other database files


// run our models file (makes all associations for our Sequelize objects)
require('./models')



var Promise = require('bluebird');

var db = require('./index')

var { User} = require('./models/index')

var data = {
    users: [
        {email: "nycjing@gmail.com", password: "123456", }
    ]
};

db.sync({ force: true })
    .then(function () {
        console.log("Dropped old data, now inserting data");

        const creatingUsers = Promise.each(data.users, function (user) {
            return User.create(user);
        });

        return Promise.all([creatingUsers])
            .then(() =>{
                console.log('Finished inserting data');
            })
            .catch(function (err) {
                console.error('There was totally a problem', err, err.stack);
            })
            .finally(function () {
                db.close(); // creates but does not return a promise
                return null; // stops bluebird from complaining about un-returned promise
            });
    })
