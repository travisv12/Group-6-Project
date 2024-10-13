Group 6 Project

# Coding Marathon 3

## Group 6

---

## Project Scope:

The project aims to create a society that contributes towards food sustainability by reducing food waste and promoting responsible consumption.

ReFoodify allows users to save near expiry food items at their home by suggesting to convert these items into delicious meals rather than throwing them away. It also allows users to share their recipes as well, which other users can use to prepare their meals.

In addition to that, it allows users to buy near expiry discounted food items available in their nearby supermarkets. When a user buys these items from the website, the user gets `reward points` on every purchase made, which can be seen in the user account page. As the user reaches `5000 reward points`, the user can get a `5€` discount on the next purchase. This is to incentives user interaction and help them to save money on their purchases.

# Project Description:

ReFoodify is a comprehensive platform that combines recipes, shopping, and user management. It allows users to create, manage, and search for recipes, shop for products, and manage their profiles. The system ensures secure user access and data protection, offering CRUD operations for recipes, products, and user profiles. It's designed with redux for scalability and maintainability in mind, making it suitable for both small and large-scale applications.

## Project Pictures:

Below images illustrate our project's display:

<p>
<img src="https://github.com/travisv12/Group-6-Project/blob/main/screenshots/Login.png" alt="Login" width="350" height="180" /> &nbsp;&nbsp;
<img src="https://github.com/travisv12/Group-6-Project/blob/main/screenshots/RecipePage.png" alt="recipe page" width="350" height="180" /> &nbsp;&nbsp;
<img src="https://github.com/travisv12/Group-6-Project/blob/main/screenshots/ShareRecipe.png" alt="share recipe" width="350" height="180" /> &nbsp;&nbsp;
<img src="https://github.com/travisv12/Group-6-Project/blob/main/screenshots/ShopPage.png" alt="shop page" width="350" height="180" /> &nbsp;&nbsp;
<img src="https://github.com/travisv12/Group-6-Project/blob/main/screenshots/CartPage.png" alt="cart page" width="350" height="180" /> &nbsp;&nbsp;
<img src="https://github.com/travisv12/Group-6-Project/blob/main/screenshots/PaymentForm.png" alt="payment page" width="350" height="180" /> &nbsp;&nbsp;
  
</p>


## Project Figma design:
Here is the project figma design:
Link : https://www.figma.com/design/1KzgiAhu10xel2PcK9ZwQr/Figma-basics?node-id=802-75&t=jFiEZsEuFilpizqz-1

# Technologies Used:

- Node.js - JavaScript runtime for server-side development<br>
- Express.js - Web application framework for Node.js<br>
- React.js - JavaScript library for building user interfaces<br>
- Redux - State management library for JavaScript applications<br>
- Multer: Middleware for handling file uploads.
- MongoDB - NoSQL database for flexible data storage<br>
- Mongoose - ODM (Object Data Modeling) library for MongoDB and Node.js<br>
- Bcryptjs - Library for hashing passwords<br>
- JSON Web Tokens (JWT) - For secure authentication<br>
- Supertest - Testing library for HTTP assertions<br>
- Jest - JavaScript testing framework<br>
- Dotenv - For managing environment variables<br>
- MongoDB Atlas - For deploying database on AWS Cloud variables<br>


## Swagger API Documentation

Swagger is used to generate interactive API documentation for ReFoodify. It provides a user-friendly interface to explore and test the API endpoints.

# Core Features:

1. Redux Store Architect and State Management.
   
2. Responsive UI Design.

3. Refresh Token based authentication mechanism.

4. Axios API Instances.
   
5. Incentivizes user engagement.

## Backend-end Deployment

Back-end Deployment Link: https://group-6-project-651h.onrender.com


# Usage

### Part 1

- **Install Frontend Dependencies & Start the App**  
   Navigate to the frontend directory `ReFoodify-main`, install dependencies, and start the application:

   ```sh
   cd ReFoodify-main
   npm install
   npm run dev
   ```

### Part 2

- **Install Backend Dependencies & Start the Server** 
  Navigate to the `Group6-be-api` directory and install the necessary dependencies:

```sh
cd Group6-be-api
npm install
node seed.js
npm run dev
```

Create a .env file in the root of your project and add the following environment variables:

```sh
PORT=4000
MONGO_URI=`mongodb+srv://<db_username>:<db_password>@cluster0.zvk7d.mongodb.net/<database_name>?retryWrites=true&w=majority`
SECRET=your_secret_key
NODE_ENV=development
TEST_MONGO_URI=`mongodb+srv://<db_username>:<db_password>@cluster0.zvk7d.mongodb.net/<test_database_name>?retryWrites=true&w=majority`
```

Replace <db_username>, <db_password>, <database_name>, and <test_database_name> with your actual MongoDB Atlas credentials and database names.

### Part 3

- The project uses Supertest for API testing, to run and check the users.test, recipes.test and orders.test files:

  ```sh
   cd Group6-be-api
   npm install
   npm test
  ```

### Part 4

- Once the server is running, you can access the Swagger JSON endpoints at the following URL:

`http://localhost:4001/api`

- The Swagger JSON file can be accessed directly at:
  `http://localhost:4001/api/swagger.json`


---

## Self-Assessment of Code

### Frontend

## 1. src/components/

### MyAccounts

  - **Functions:** This component manages user accounts related functionalities. Like account information, purchase history, and recipe management.
  - **Explanation:**
    - Handles account information like user name, email, profile picture and reward points.
    - Handle purchase history including order details and payment information.
    - Manages posted recipes and recipe management like editing and deleting existing recipes.

### Header.jsx

  - **Functions:** Renders the navigation bar and handles user authentication.
  - **Explanation:**
    - Handles user authentication status
    - Displays appropriate links
    - Manages logout functionality

### PaymentForm.jsx

  - **Functions:** Renders the payment form and handles payment processing.
  - **Explanation:**
    - Renders the payment form for users to enter payment details.
    - Handles payment processing and API calls for payment processing.

## 2. src/pages/

### Auth

  - **Functions:** Contains the logic for user authentication. It includes pages like Login and Register.
  - **Explanation:**
    - Manages user authentication logic including login and registration.

### Recipes

  - **Functions:** Contains the logic for recipe management. It includes pages like index, CreateRecipe, UpdateRecipe and RecipeDetails.
  - **Explanation:**
    - Index.jsx: Display the generated recipe logic from available ingredients.
    - CreateRecipe.jsx: Allows users to create new recipes.
    - UpdateRecipe.jsx: Allows users to update existing recipes.

### Shop

  - **Functions:** Contains the logic for displaying near expiry food items.
  - **Explanation:**
    - Index.jsx: Displays the list of near expiry food items. It renders the list of near expiry food items from the database and displays them.

### Cart

  - **Functions:** Contains the logic for cart management. 
  - **Explanation:**
    - Index.jsx: Displays the cart items and calculates the total price and discount price. It also handles redeem points logic which the user can redeem.

## 3. src/redux/

### recipe

  - **Functions:** Manages the recipe state and handles recipe-related actions. It has three separate files:
  - **Explanation:**
    - *actions.js*: Defines the actions for generating, adding, removing, and updating recipes. It also handles fetching user specific recipes.
    - *actionTypes.js*: Defines the action types for recipe-related actions.
    - *reducer.js*: Defines the reducer function for updating the recipe state based on dispatched actions.

### user

  - **Functions:** Manages the user state and handles user-related actions. It has three separate files:
  - **Explanation:**
    - *actions.js*: Defines the actions for user authentication, login, logout, and updating user information. It also handles refresh token logic.
    - *actionTypes.js*: Defines the action types for user-related actions.
    - *reducer.js*: Defines the reducer function for updating the user state based on dispatched actions.

### cart

- **Functions:** Manages the cart state and handles cart-related actions. It has three separate files:
- **Explanation:**
    - *actions.js*: Defines the actions for adding, removing, and updating items in the cart.
    - *actionTypes.js*: Defines the action types for cart-related actions.
    - *reducer.js*: Defines the reducer function for updating the cart state based on dispatched actions.

### order

- **Functions:** Manages the order state and handles order-related actions. It has three separate files:
- **Explanation:**
  - *actions.js*: Defines the actions for checking out and placing orders. It also handle fetching user related orders.
  - *acctionTypes.js*: Defines the action types for order-related actions.
  - *reducer.js*: Defines the reducer function for updating the order state based on dispatched actions.

### axiosInstance.js

  - **Functions:** Manages the Axios instance for API calls.
  - **Explanation:**
    - Manages the Axios instance for API calls.
    - Handles API calls for user authentication, recipe management, and cart management.
    - Includes file uploads for profile pictures.

### store.js

  - **Functions:** Manages the Redux store.
  - **Explanation:**
    - Manages the Redux store.
    - Includes middleware for handling asynchronous actions.
    - Includes reducers for managing user, recipe, cart, and order states.

## 4. src/routes/

### index.jsx

  - **Functions:** Manages the routing for the application.
  - **Explanation:**
    - Manages the routing for the application.
    - Includes routes for user authentication, recipe management, cart management, and order management.
    - It has an authentication check from redux state that redirects to the login page if the user is not authenticated. It includes the protected routes for specific pages.

## 5. src/app.jsx

  - **Functions:** Manages the application initialization.
  - **Explanation:**
    - Manages the application initialization.
    - Includes middleware for handling asynchronous actions.


## Front-end Conclusion

`add assessment here`

### Backend

## 1. Group-6-api/controllers/

### authControllers.js

  - **Functions:** Manages user authentication
  - **Explanation:**
    - Handles HTTP requests for user registration and login.
    - Calls the authService for business logic.
    - Handles user logout.

### recipeControllers.js

  - **Functions:** Manages recipe-related operations
  - **Explanation:**
    - Handles HTTP requests for CRUD operations on recipes.
    - Calls the recipeService for business logic.

### orderControllers.js

  - **Functions:** Manages order-related operations
  - **Explanation:**
    - Handles HTTP requests for CRUD operations on orders.
    - Calls the orderService for business logic.
  
### cartControllers.js

  - **Functions:** Manages cart-related operations
  - **Explanation:**
    - Handles HTTP requests for CRUD operations on cart items.
    - Calls the cartService for business logic.

### userControllers.js

  - **Functions:** Manages user-related operations
  - **Explanation:**
    - Handles HTTP requests for CRUD operations on user accounts.
    - Calls the userService for business logic.

## 2.Group-6-api/models/

### order.js

  - **Functions:** Defines the schema for orders
  - **Explanation:**
    - Defines the structure of order documents in the database.
    - Includes fields for order details, user information, and timestamps.
    - Provides a model for database interactions.


### recipeModel.js

  - **Functions:** Defines the schema for recipes
  - **Explanation:**
    - Defines the structure of recipe documents in the database.
    - Includes fields for recipe details, user information, and timestamps.
    - Provides a model for database interactions.

### cartModel.js

  - **Functions:** Defines the schema for cart items
  - **Explanation:**
    - Defines the structure of cart item documents in the database.
    - Includes fields for cart item details, user information, and timestamps.
    - Provides a model for database interactions.

### userModel.js

  - **Functions:** Defines the schema for user accounts
  - **Explanation:**
    - Defines the structure of user account documents in the database.
    - Includes fields for user authentication, profile information, and timestamps.
    - Provides a model for database interactions.

## 3.Group-6-api/routes/

### authRouter.js

  - **Functions:** Sets up routes for authentication endpoints
  - **Explanation:**
    - Uses Express Router to define API endpoints.
    - Maps HTTP requests to authController functions.
    - Implements any necessary middleware for authentication routes.


### recipeRouter.js

  - **Functions:** Establishes routes for recipe-related actions
  - **Explanation:**
    - Uses Express Router to define API endpoints.
    - Maps HTTP requests to recipeController functions.
    - Implements any necessary middleware for recipe routes.
    - Includes authentication middleware where required.

### cartRouter.js

  - **Functions:** Establishes routes for cart-related actions.
  - **Explanation:**
    - Uses Express Router to define API endpoints.
    - Maps HTTP requests to cartController functions.
    - Includes authentication middleware where required.

### orderRouter.js

  - **Functions:** Establishes routes for order-related actions.
  - **Explanation:**
    - Uses Express Router to define API endpoints.
    - Maps HTTP requests to orderController functions.
    - Includes authentication middleware where required.

### userRouter.js

  - **Functions:** Establishes routes for user-related actions.
  - **Explanation:**
    - Uses Express Router to define API endpoints.
    - Maps HTTP requests to userController functions.
    - Includes authentication middleware where required.

## 4. Group-6-api/middleware/

### auth.js

  - **Functions:** Implements authentication middleware
  - **Explanation:**
    - Verifies JWT tokens for protected routes
    - Ensures only authenticated users can access certain endpoints
    - Adds user information to the request object for downstream use.
    - verify refresh token and provide new access token and refresh token.
    - error logger for error handling.
    - error response for error handling.
    - invalid path error handling.

## 5. Group-6-api/Services/

### authService.js

  - **Functions:** Manages user authentication
  - **Explanation:**
    - Handles user registration and login
    - Uses bcrypt for secure password hashing
    - Implements JWT for user authentication
    - Refresh token logic for token expiration

### recipeService.js

  - **Functions:** Manages recipe-related operations
  - **Explanation:**
    - Handles CRUD operations for recipes.
    - Interacts with the Recipe model.
    - Implements business logic for recipe-related features.

### orderService.js

  - **Functions:** Manages order-related operations
  - **Explanation:**
    - Handles CRUD operations for orders.
    - Interacts with the Order model.
    - Implements business logic for order-related features.


### cartService.js

  - **Functions:** Manages cart-related operations
  - **Explanation:**
    - Handles CRUD operations for cart items.
    - Interacts with the Cart model.
    - Implements business logic for cart-related features.

### userService.js

  - **Functions:** Manages user-related operations
  - **Explanation:**
    - Handles CRUD operations for user accounts.
    - Interacts with the User model.
    - Implements business logic for user-related features.

## 6. backend-protected/tests/

### users.test.js

  - **Functions:** Tests user-related API endpoints
  - **Explanation:**
    - Validates user registration and login processes
    - Checks authentication and authorization mechanisms
    - Ensures user data is properly handled and secured

### recipes.test.js

  - **Functions:** Tests recipe-related API endpoints
  - **Explanation:**
    - Validates recipe creation, retrieval, and deletion.
    - Checks authentication and authorization mechanisms.
    - Ensures recipe data is properly handled and secured.
    
### orders.test.js

  - **Functions:** Tests order-related API endpoints.
  - **Explanation:**
    - Validates order creation, retrieval, and deletion.
    - Checks authentication and authorization mechanisms.
    - Ensures order.
    - data is properly handled and secured.

### carts.test.js

  - **Functions:** Tests cart-related API endpoints.
  - **Explanation:**
    - Validates cart item creation, retrieval, and deletion.
    - Checks authentication and authorization mechanisms.
    - Ensures cart item data is properly handled and secured.

 
##  7. Future Enhancements

- Integrate with Supermarkets:
Take free API's from supermarkets and integrate with our app to get the latest prices and products for the shop list.

- *Rating System*:
Allow users to rate and review recipes of other users. 

- *User recipe sharing points*:
Users can share their recipes with others. Once a recipe is shared, the user gets points based on the rating of the recipe.

- *PUSH notifications*:
Users can get notifications when a new product is available in the store.

- *Nearest delivery option*:
Users can get the nearest delivery option based on their location. We can use Google Maps API to get the nearest delivery option.

## Backend-end Conclusion

`add assessment here`



