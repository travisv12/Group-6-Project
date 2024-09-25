require("dotenv").config();
const express = require("express");
const connectDB = require("./Models/database");
const userRoutes = require("./Routes/userRoutes");
const recipeRoutes = require("./Routes/recipeRoutes");
const {
  errorLogger,
  errorResponder,
  invalidPathHandler,
} = require("./Middleware/auth");

const app = express();

connectDB();

app.use(express.json());

// Use the user routes
app.use("/api/users", userRoutes);

// Use the recipe routes
app.use("/api", recipeRoutes);

// Use the invalid path handler for undefined routes
app.use("*", invalidPathHandler);

// Use the error handling middleware
app.use(errorLogger);
app.use(errorResponder);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
