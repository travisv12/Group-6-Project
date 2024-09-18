const express = require("express");
const { validateLogin, authenticateJWT } = require("../Middleware/auth");
const {
  signup,
  login,
  refreshToken,
  logout,
} = require("../Controllers/authControllers");

const { updateUser, getUserInfo } = require("../Controllers/userControllers");

const router = express.Router();

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

// Route for user sign-up
router.post("/signup", validateLogin, signup); // Rename validateLogin to validateSignup

// Route for user login
router.post("/login", login);

// Route for refreshing token
router.post("/refresh-token", refreshToken);

// Route for logging out
router.delete("/logout", logout);

// Route for fetching user information (protected)
router.get("/info", authenticateJWT, getUserInfo);

// Route for updating user information (protected)
router.put("/update", authenticateJWT, updateUser);

module.exports = router;
