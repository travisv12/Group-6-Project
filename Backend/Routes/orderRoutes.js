// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const {
  checkoutController,
  getUserOrdersController,
  getOrderDetailsController,
  getUserRewardPointsController,
} = require("../Controllers/orderControllers");
const { authenticateJWT } = require("../Middleware/auth");


// Checkout route
router.post('/checkout', authenticateJWT, checkoutController);

// Get user orders route
router.get('/my-purchases/:userId', authenticateJWT, getUserOrdersController);

// Get order details by order ID route
router.get('/order/:orderId', authenticateJWT, getOrderDetailsController);


module.exports = router;
