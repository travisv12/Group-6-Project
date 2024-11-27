const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const db = require("../Models/database");


const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// request logger middleware
const requestLogger = (request, response, next) => {
  console.log(`${request.method} url:: ${request.url}`);
  next();
};

// error logger middleware
const errorLogger = (error, request, response, next) => {
  console.log(`error ${error.message}`);
  next(error); // calling next middleware
};

// error handler middleware
const errorResponder = (error, request, response, next) => {
  response.header("Content-Type", "application/json");
  const status = error.status || 400;
  response.status(status).send(error.message);
};

// invalid path handler middleware
const invalidPathHandler = (request, response, next) => {
  response.status(400);
  response.send("invalid path");
};

// Middleware to authenticate JWT token
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (req.path == "/login" || req.path === "/signup" || req.path === "/refresh-token") return next();

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(401);
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send("Access denied. No token provided.");
  }
};

// Middleware to verify refresh token
const verifyRefreshToken = (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).send("Refresh token is required");
  }

  jwt.verify(token, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid refresh token");
    }
    req.user = user;
    next();
  });
};

// Middleware to validate SignIn request
const validateLogin = (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res
      .status(400)
      .send("Username, password and email are required");
  }
  next();
};

module.exports = {
  validateLogin,
  verifyRefreshToken,
  errorLogger,
  errorResponder,
  invalidPathHandler,
  authenticateJWT,
  requestLogger,
};
