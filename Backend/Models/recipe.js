const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  author: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },
  serving: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
