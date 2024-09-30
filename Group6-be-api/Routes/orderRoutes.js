// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderControllers");
const { authenticateJWT } = require("../Middleware/auth");


// Route to get the cart items for the authenticated user
router.get("/cart", authenticateJWT, orderController.getOrder);

// Route to add an item to the cart
router.post("/cart", authenticateJWT, orderController.addItem);

// Route to remove an item from the cart
router.delete("/cart/:productId", authenticateJWT, orderController.removeItem);

// Route to update the quantity of an item in the cart
router.put("/cart/:productId", authenticateJWT, orderController.updateQuantity);

module.exports = router;
