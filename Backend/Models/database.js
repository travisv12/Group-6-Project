dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = async () => {
    const dbURI =
      process.env.NODE_ENV === "test"
        ? process.env.TEST_MONGO_URI
        : process.env.MONGO_URI;
  try {
    await mongoose.connect(dbURI);
    console.log(
      `MongoDB connected to ${
        process.env.NODE_ENV === "test" ? "test" : "development"
      } database`
    );
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
