const multer = require("multer");
const path = require("path");
const User = require("../Models/users");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../ReFoodify-main/public/avatars/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
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
  console.log(req.file);
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const avatarUrl = `../../../public/avatars/${req.file.filename}`;

  // Update user's avatar URL in the database
  try {
    await User.findByIdAndUpdate(req.user.id, { avatarUrl: avatarUrl });
    res.json({ avatarUrl: avatarUrl });
  } catch (error) {
    res.status(500).json({ message: "Error updating avatar" });
  }
});

// Route for user sign-up
router.post("/signup", validateLogin, signupController);

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
