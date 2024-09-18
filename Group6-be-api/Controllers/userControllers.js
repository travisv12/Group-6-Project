const User = require("../Models/users");
const bcrypt = require("bcryptjs");

// Handler for fetching user information
const getUserInfo = async (req, res) => {
  const userId = req.user.id; // Get user ID from the authenticated user

  try {
    const user = await User.findById(userId).select('-password'); // Exclude password from the response
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const updateUser = async (req, res) => {
  const userId = req.user.id; // Get user ID from the authenticated user
  const { firstName, lastName, username, email, password } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Update user information
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).send("User information updated successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  updateUser,
  getUserInfo,
};
