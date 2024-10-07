const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  earnedPoints: { 
    type: Number, 
    required: true 
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
