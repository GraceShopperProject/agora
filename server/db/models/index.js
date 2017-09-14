const User = require('./user');
const Order = require('./order');
const Category = require('./category');
const Product = require('./product');
const Review = require('./review');
const Order_Product = require('./order_product');

/**
 * Associations
 */
User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: Order_Product });
Product.belongsToMany(Order, { through: Order_Product });

/* Not sure if this will work as expected. I want categories to have multiple
sub-categories AND for a particular category to be a sub-category of many
categories. */
Category.belongsToMany(Category, {
  as: 'Subcategory',
  through: 'category_subcategory',
});

Category.belongsToMany(Product, { through: 'product_category' });
Product.belongsToMany(Category, { through: 'product_category' });

Product.hasMany(Review);
Review.belongsTo(Product);
Review.belongsTo(User);

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Order,
  Product,
  Category,
  Review,
};
