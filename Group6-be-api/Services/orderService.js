const Order = require("../Models/order");
const User = require("../Models/users");

// Service for handling checkout
const checkout = async (userId, checkoutData, earnedPoints) => {
  const { items, cartTotal } = checkoutData;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Update user's reward points
  user.rewardPoints += earnedPoints;
  await user.save();

  // Create new order
  const newOrder = new Order({
    userId,
    items,
    totalPrice: parseFloat(cartTotal),
    earnedPoints,
  });

  await newOrder.save();
  return newOrder;
};

// Service for fetching user orders
const getUserOrders = async (userId) => {
  const orders = await Order.find({ userId }).populate("items.productId");
  return orders;
};

// Service for fetching order details
const getOrderById = async (userId, orderId) => {
  const order = await Order.findOne({ _id: orderId, userId })
    .sort({ createdAt: -1 })
    .populate("items.productId")
    .select("+earnedPoints"); // Explicitly include earnedPoints in the query result

  return order;
};


module.exports = {
  checkout,
  getUserOrders,
  getOrderById,
};
