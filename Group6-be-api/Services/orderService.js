// services/orderService.js
const Order = require("../Models/order");
const Product = require("../Models/Product");

const getOrderByUserId = async (userId) => {
  return await Order.findOne({ userId }).populate("items.productId");
};

const addItemToOrder = async (userId, productId, quantity) => {
  let order = await Order.findOne({ userId });

  if (!order) {
    order = new Order({ userId, items: [] });
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const orderItem = order.items.find((item) => item.productId.equals(productId));
  if (orderItem) {
    orderItem.quantity += quantity;
  } else {
    order.items.push({ productId, quantity });
  }

  await order.save();
  return order;
};

const removeItemFromOrder = async (userId, productId) => {
  const order = await Order.findOne({ userId });
  if (!order) {
    throw new Error("Order not found");
  }

  order.items = order.items.filter((item) => !item.productId.equals(productId));
  await order.save();
  return order;
};

const updateItemQuantity = async (userId, productId, quantity) => {
  const order = await Order.findOne({ userId });
  if (!order) {
    throw new Error("Order not found");
  }

  const orderItem = order.items.find((item) => item.productId.equals(productId));
  if (!orderItem) {
    throw new Error("Item not found in the order");
  }

  orderItem.quantity = quantity;
  await order.save();
  return order;
};

module.exports = {
  getOrderByUserId,
  addItemToOrder,
  removeItemFromOrder,
  updateItemQuantity,
};
