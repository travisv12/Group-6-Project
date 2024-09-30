// controllers/orderController.js
const orderService = require("../Services/orderService");

const getOrder = async (req, res) => {
  const userId = req.user.id;

  try {
    const order = await orderService.getOrderByUserId(userId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;


  try {
    const order = await orderService.addItemToOrder(userId, productId, quantity);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const removeItem = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    const order = await orderService.removeItemFromOrder(userId, productId);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user.id;

  try {
    const order = await orderService.updateItemQuantity(
      userId,
      productId,
      quantity
    );
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrder,
  addItem,
  removeItem,
  updateQuantity,
};
