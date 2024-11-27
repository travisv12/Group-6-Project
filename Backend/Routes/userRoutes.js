const multer = require("multer");
const path = require("path");
const User = require("../Models/users");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../ReFoodify-main/public/avatars/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const express = require("express");
const { validateLogin, authenticateJWT } = require("../Middleware/auth");
const {
  signupController,
  loginController,
  refreshTokenController,
  logoutController,
} = require("../Controllers/authControllers");

const {
  getUserInfoController,
  updateUserController,
} = require("../Controllers/userControllers");

const router = express.Router();

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/upload-avatar", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const avatarUrl = `../../../public/avatars/${req.file.filename}`;
  const userId = req.body.userId;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatarUrl: avatarUrl },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ avatarUrl: avatarUrl });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ message: "Error updating avatar" });
  }
});

// Route for user sign-up
router.post("/signup", signupController);

// Route for user login
router.post("/login", loginController);

// Route for refreshing token
router.post("/refresh-token", refreshTokenController);

// Route for logging out
router.delete("/logout", logoutController);

// Route for fetching user information (protected)
router.get("/info", authenticateJWT, getUserInfoController);

// Route for updating user information (protected)
router.put("/update", authenticateJWT, updateUserController);

module.exports = router;
