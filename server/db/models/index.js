const User = require('./user');
const Order = require('./order');
const Category = require('./category');
const Product = require('./product');
const Review = require('./review');
const Order_Product = require('./order_product');

/**
 * Table Associations
 */
User.Orders = User.hasMany(Order);
Order.User = Order.belongsTo(User);

Order.Products = Order.belongsToMany(Product, { through: Order_Product });
Product.Orders = Product.belongsToMany(Order, { through: Order_Product });

/* Not sure if this will work as expected. I want categories to have multiple
sub-categories AND for a particular category to be a sub-category of many
categories. */
Category.Subcategories = Category.belongsToMany(Category, {
  as: 'Subcategory',
  through: 'category_subcategory',
});

Category.Products = Category.belongsToMany(Product, { through: 'products_categories' });

Product.Categories = Product.belongsToMany(Category, { through: 'products_categories' });

Product.Reviews = Product.hasMany(Review);
Review.Product = Review.belongsTo(Product);
Review.User = Review.belongsTo(User);

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
  Order_Product,
};
