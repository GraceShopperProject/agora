# Agora:
The Best Way to Sell Your Products Online
====

## DEVELOPMENT WORKFLOW (using Waffle.io):

* Make a Waffle/GitHub issue for the task.
* Assign a teammate/pair to work on the task.

* Assignees, branch off of master `git checkout -b myNiftyBranch#8675309` (don't forget the GitHub issue # !)
* Continually `git commit` locally as you code (don't need to push to remote every time)
* When ready to merge your branch with remote master, do the following:
  1. `git checkout master` locally
  2. `git pull origin master` to make sure your local master is up-to-date with remote master
  3. `git checkout yourNiftyBranch#123` (whatever branch you're preparing to submit for pull request)
  4. `git merge master` to merge the latest master with your branch (to catch any merge conflicts before requesting to merge your branch with remote master)
  5. Fix any conflicts

* When certain that your branch does not conflict with remote master,
  * `git push origin myNiftyBranch#123` to the remote branch
  * Go to GitHub repo and open a **Pull Request** to merge with Master
  * Assign at least one teammate to review/approve the request
  * Write any comments that could help make your reviewer's job easier

* Reviewer:
  * Before merging the Pull Request
    - make sure everything looks as expected
    - run tests (if any; if none, ask for some if appropriate)
    - write comments to get any doubts/uncertainties resolved
    - if test fails/something looks wrong, send back to teammate with instructions for correction
  * When all tests pass / everything looks satisfactory
    -  Merge the PR

* Everybody: switch to master, pull from origin.
  - `git checkout master` locally
  - `git pull origin master` to bring local master up-to-date
  - (optionally) `git checkout *theBranchYouWereWorkingOn#55* && git merge master` to bring your branch up-to-date with master

[Click here for more info on recommended workflow] (https://help.waffle.io/automatic-work-tracking/auto-work-tracking-basics/recommended-workflow-using-pull-requests-automatic-work-tracking)

----

## **USER STORIES:**
---
### **AS A VISITOR, I WANT TO...**

### PRODUCTS

...view all available products
...filter products by category
...search for a product with a searchbar
...view details for an inidivdual product

### CART

...add items to my cart (from all products or single product page)
...remove items from my cart
...edit/remove quantities of items in the cart
...keep my cart on page reload
...keep my cart after logout & login

### CHECKOUT

...complete my order on a checkout page
...enter address and email for order recipient
...submit payment for order
...receive receipt/confirmation email after checkout
...receive shipping confirmation
...receive delivery confirmation

### ACCOUNT MANAGEMENT

...create an account to gain typical user privileges
...create an account with google or facebook oauth
---

### **AS AN AUTHENTICATED USER, I WANT TO...**

### ACCOUNT MANAGEMENT

...be able to log out
...view my list of previous orders
...leave a review for an item in a previous order
...view the details of a past order, including:
  * Current order status
  * Items with quantity and subtotal
  * Link to the original product detail page
  * Date/time order was created

### REVIEWS

...leave a review for a product on product detail page
...leave a review for a product from the past orders page
---

### **AS AN ADMIN USER, I WANT TO...**

## PRODUCT MANAGEMENT

...create and edit products
  * with name, description, category, price, and one or more photos
...create categories for items
...add/remove categories from items
  * _Acceptance Criteria: items must have multiple categories_
...toggle the availability of a product
  * _Acceptance Criteria: Users can't see unavailable products unless they have a direct link (from previous order). On that product detail page, it should say "Currently Unavailable"_

## ORDER MANAGEMENT

...view a list of all orders
...filter orders by status (Created, Processing, Cancelled, Completed)
...view details of a specific order
...change the status of the order (Created -> Processing, Processing -> Cancelled || Completed)

## USER MANAGEMENT

...promote other user accounts to have admin status
...delete a user
...trigger password reset for a user (that is, the next time they successfully log in with their old password, they are prompted for a new one)

---

## Linting

* `npm install -g eslint`
* In the root of your project, `eslint --init`
* Select the `Use a popular style guide option`.
* Choose AirBnB style ([Airbnb style guide](https://github.com/airbnb/javascript))
* Choose .js or .json format.
* You may also need to install an appropriate eslint plugin specific for your code editor.

---

## Deployment

Ready to go world wide? Here's a guide to deployment!

### Prep
1. Set up the [Heroku command line tools](https://devcenter.heroku.com/articles/heroku-cli)
2. `heroku login`
3. Add a git remote for heroku:
  - **If you're creating a new app...**
    1. `heroku create` or `heroku create your-app-name` if you have a name in mind.
    2. `heroku addons:create heroku-postgresql:hobby-dev` to add ("provision") a postgres database to your heroku dyno

  - **If you already have a Heroku app...**
    1.  `heroku git:remote your-app-name` You'll need to be a collaborator on the app.

### When you're ready to deploy

1. Make sure that all your work is fully committed and pushed to your master branch on Github.
2. If you currently have an existing branch called "deploy", delete it now (`git branch -d deploy`). We're going to use a dummy branch with the name "deploy" (see below), so if you have one lying around, the script below will error
3. `npm run deploy` - this will cause the following commands to happen in order:
  - `git checkout -b deploy`: checks out a new branch called "deploy". Note that the name "deploy" here isn't magical, but it needs to match the name of the branch we specify when we push to our heroku remote.
  - `webpack -p`: webpack will run in "production mode"
  - `git add -f public/bundle.js public/bundle.js/map`: "force" add the otherwise gitignored build files
  - `git commit --allow-empy -m 'Deploying'`: create a commit, even if nothing changed
  - `git push --force heroku deploy:master`: push your local "deploy" branch to the "master" branch on heroku
  - `git checkout master`: return to your master branch
  - `git branch -D deploy`: remove the deploy branch

Now, you should be deployed!

Why do all of these steps? The big reason is because we don't want our production server to be cluttered up with dev dependencies like webpack, but at the same time we don't want our development git-tracking to be cluttered with production build files like bundle.js! By doing these steps, we make sure our development and production environments both stay nice and clean!
