const jwt = require("jsonwebtoken");
const User = require("../Models/users");
const bcrypt = require("bcryptjs");
const RefreshToken = require("../Models/refreshToken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const signup = async (req, res) => {
  const { firstName, lastName, username, password, role, email } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).send("User already exists");
    }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      role,
      email,
    });
    await user.save();
    res.status(201).send({ userId: user._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  console.log("Login request received");
  console.log("Request body:", req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Save the refresh token in the database
    const newRefreshToken = new RefreshToken({
      token: refreshToken,
      userId: user._id,
    });
    await newRefreshToken.save();

    res.status(200).json({ userId: user._id, accessToken, refreshToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).send("Refresh token is required");
  }

  try {
    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken) {
      return res.status(403).send("Invalid refresh token");
    }
    const decodedToken = jwt.decode(storedToken.token);
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).send("Invalid refresh token");
      }

      // Remove the used refresh token from the database
      await RefreshToken.deleteOne({ token: storedToken });

      const accessToken = jwt.sign(
        { id: decodedToken.id, role: decodedToken.role },
        JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      const refreshToken = jwt.sign(
        { id: decodedToken.id, role: decodedToken.role },
        REFRESH_TOKEN_SECRET,
        {
          expiresIn: "7d",
        }
      );

      // Save the refresh token in the database
      const newRefreshToken = new RefreshToken({
        token: refreshToken,
        userId: decodedToken.id,
      });
      await newRefreshToken.save();
      res
        .status(200)
        .json({ userId: decodedToken.id, accessToken, refreshToken });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const logout = (req, res) => {
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== refreshToken);
  res.sendStatus(204);
};

module.exports = {
  signup,
  login,
  refreshToken,
  logout,
};
