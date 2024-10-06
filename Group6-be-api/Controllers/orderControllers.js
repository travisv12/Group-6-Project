const {
  checkout,
  getUserOrders,
  getOrderById,
  // getUserRewardPoints,
} = require("../Services/orderService");

const checkoutController = async (req, res) => {
  const userId = req.user.id;
  const { cart, cartTotal, earnedPoints } = req.body;

  // Transform cart items to match the expected structure
  const items = cart.map((item) => ({
    productId: item.id,
    quantity: item.quantity || 1, // Assuming quantity is 1 if not provided
  }));

  try {
    const newOrder = await checkout(userId, { items, cartTotal }, earnedPoints);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getUserOrdersController = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await getUserOrders(userId);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOrderDetailsController = async (req, res) => {
  const userId = req.user.id;
  const { orderId } = req.params;

  try {
    const order = await getOrderById(userId, orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const getUserRewardPointsController = async (req, res) => {
  const userId = req.user.id;

  try {
    const { rewardPoints } = await getUserRewardPoints(
      userId
    );
    res.status(200).json({ rewardPoints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  checkoutController,
  getUserOrdersController,
  getOrderDetailsController,
  getUserRewardPointsController,
};
