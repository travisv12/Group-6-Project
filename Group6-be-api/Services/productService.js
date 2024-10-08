const Product = require("../Models/Product");

// Service for getting all products
const getAllProducts = async () => {
  try {
    return await Product.find();
  } catch (err) {
    throw new Error(err.message);
  }
};

// Service for getting a single product by ID
const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");
    return product;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
