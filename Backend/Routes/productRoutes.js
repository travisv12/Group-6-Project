const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productController");

// Route to get all products
router.get("/products", productController.getAllProducts);

// Route to get a single product by ID
router.get("/products/:id", productController.getProductById);

module.exports = router;
