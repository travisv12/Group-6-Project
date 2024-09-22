const express = require("express");
const { validateLogin, authenticateJWT } = require("../Middleware/auth");
const {
  signupController,
  loginController,
  refreshTokenController,
  logoutController,
} = require("../Controllers/authControllers");

const {
  getUserInfoController,
  updateUserController,
} = require("../Controllers/userControllers");

const router = express.Router();

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

// Route for user sign-up
router.post("/signup", validateLogin, signupController); 

// Route for user login
router.post("/login", loginController);

// Route for refreshing token
router.post("/refresh-token", refreshTokenController);

// Route for logging out
router.delete("/logout", logoutController);

// Route for fetching user information (protected)
router.get("/info", authenticateJWT, getUserInfoController);

// Route for updating user information (protected)
router.put("/update", authenticateJWT, updateUserController);

module.exports = router;
