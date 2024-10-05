const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/users");
const RefreshToken = require("../Models/refreshToken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const createUser = async ({
  username,
  password,
  role,
  email,
}) => {
  let user = await User.findOne({ username });
  if (user) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  user = new User({
    username,
    password: hashedPassword,
    role,
    email,
  });
  await user.save();

  // return user._id;
    const accessToken = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
      const refreshToken = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      const newRefreshToken = new RefreshToken({
        token: refreshToken,
        userId: user._id,
      });
      await newRefreshToken.save();

      return { userId: user._id, accessToken, refreshToken };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Email credentials");
  }
    
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Password donot match");
  }

  const accessToken = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  const refreshToken = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  const newRefreshToken = new RefreshToken({
    token: refreshToken,
    userId: user._id,
  });
  await newRefreshToken.save();

  return { userId: user._id, accessToken, refreshToken };
};



 const refreshTokenService = async (token) => {
   const storedToken = await RefreshToken.findOne({ token });
   if (!storedToken) {
     throw new Error("Invalid refresh token");
   }

   const decodedToken = jwt.decode(storedToken.token);

   try {
     await new Promise((resolve, reject) => {
       jwt.verify(token, REFRESH_TOKEN_SECRET, (err) => {
         if (err) {
           return reject(new Error("Invalid refresh token"));
         }
         resolve();
       });
     });

     await RefreshToken.deleteOne({ token: storedToken.token });

     const accessToken = jwt.sign(
       { id: decodedToken.id, role: decodedToken.role },
       JWT_SECRET,
       { expiresIn: "2h" }
     );

     const newRefreshToken = jwt.sign(
       { id: decodedToken.id, role: decodedToken.role },
       REFRESH_TOKEN_SECRET,
       { expiresIn: "7d" }
     );

     const newRefreshTokenDoc = new RefreshToken({
       token: newRefreshToken,
       userId: decodedToken.id,
     });
     await newRefreshTokenDoc.save();

     return {
       userId: decodedToken.id,
       accessToken,
       refreshToken: newRefreshToken,
     };
   } catch (err) {
     throw new Error("Invalid refresh token");
   }
 };



const getUserInfo = async (userId) => {
  const user = await User.findById(userId).select("-password"); // Exclude password from the response
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const updateUser = async (
  userId,
  { username, email, password }
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Update user information
  if (username) user.username = username;
  if (email) user.email = email;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  await user.save();
  return "User information updated successfully";
};

const logoutUser = async (token) => {
  await RefreshToken.deleteOne({ token });
};

module.exports = {
  createUser,
  loginUser,
  refreshTokenService,
  logoutUser,
  getUserInfo,
  updateUser,
};
