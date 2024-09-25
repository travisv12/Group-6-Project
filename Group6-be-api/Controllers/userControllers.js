const { getUserInfo, updateUser } = require("../Services/userService");


// Handler for fetching user information
const getUserInfoController = async (req, res) => {
  const userId = req.user.id; // Get user ID from the authenticated user

  try {
    const user = await getUserInfo(userId);
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};


// Handler for updating user information
const updateUserController = async (req, res) => {
  const userId = req.user.id; // Get user ID from the authenticated user
  const { firstName, lastName, username, email, password } = req.body;

  try {
    const message = await updateUser(userId, { firstName, lastName, username, email, password });
    res.status(200).send(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};



module.exports = {
  getUserInfoController,
  updateUserController,
};
