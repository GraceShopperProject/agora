
MODELS

User 'user' 
  email: STRING,
  password: STRING,
  salt: STRING,
  google_id: STRING,
  first_name: STRING,
  last_name: STRING,
  phone: STRING,
  street_address_1: STRING,
  street_address_2: STRING,
  city: STRING,
  state: STRING,
  zip: STRING,
  is_admin: BOOLEAN,
    default value: false,
  getterMethods:
    address(),
    name(),
  see model definition for password crypto

Review 'review' 
  rating: INTEGER,
  text: TEXT
 
Product 'product'
  name: STRING,
  price: INTEGER,
  description: TEXT,
  img_url: STRING,
  remaining_inventory: INTEGER,
  isInStock = function () {
    return this.remainingInventory > 0;

Order 'order'
  // DEFAULT SCOPE: Will have User and Products returned
  special_instructions: TEXT,
  status: ENUM(['Created', 'Processing', 'Cancelled', 'Completed']),
    defaultValue: 'Created',
  total_price: INTEGER,

Order_Product 'order_products'
  product_price: INTEGER,
  quantity: INTEGER,

Category 'category'
  name: STRING, // Capital case




order : {
  special_instructions:
  total_price: null
  userId: req.session.userId ? req.session.userId : null
  products: [{
    productId:
    product_price:
    quantity: 
    
  },
  {
    ...
  }]
}

shoppingCart : {
  total_price: 
  products: [{
    productId:
    product_price:
    quantity: 
    name: 
    
  },
  {
    ...
  }]
}