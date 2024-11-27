const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  store: { type: String, required: true },
  location: { type: String, required: true },
  img: { type: String, required: false },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
