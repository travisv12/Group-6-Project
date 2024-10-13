const {
  createUser,
  loginUser,
  refreshTokenService,
  logoutUser,
} = require("../Services/userService");

// Handler for user signup
const signupController = async (req, res) => {
  const { username, password, email } = req.body;


  // Check for missing fields
  if (!username || !password || !email) {
    return res.status(400).send({ error: "All fields required" });
  }

  try {
    const { userId, accessToken, refreshToken } = await createUser({
      username,
      password,
      email,
    });
    res.status(201).send({ userId, accessToken, refreshToken });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// Handler for user login
const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { userId, accessToken, refreshToken } = await loginUser({
      email,
      password,
    });
    res.status(200).json({ userId, accessToken, refreshToken });
  } catch (err) {
    res.status(401).send({ error: "Invalid credentials" });
  }
};

// Handler for refreshing tokens
const refreshTokenController = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).send("Refresh token is required");
  }

  try {
    const updatedRefreshToken = await refreshTokenService(refreshToken);
    const userId = updatedRefreshToken.userId;
    const accessToken = updatedRefreshToken.accessToken;
    const newRefreshToken = updatedRefreshToken.newRefreshToken;
    res
      .status(200)
      .json({ userId, accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    console.error(err.message);
    res.status(403).send(err.message);
  }
};

// Handler for user logout
const logoutController = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    await logoutUser(refreshToken);
    res.sendStatus(204);
  } catch (err) {
    // console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  signupController,
  loginController,
  refreshTokenController,
  logoutController,
};
