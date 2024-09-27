const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Recipe = require("./Models/recipe");
const User = require("./Models/users");
const connectDB = require("./Models/database");

const seedUsers = async () => {
  const users = [
    {
      firstName: "John",
      lastName: "Doe",
      username: "user1",
      password: await bcrypt.hash("password1", 10), // Hash the password
      role: "user",
      email: "user1@example.com",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      username: "user2",
      password: await bcrypt.hash("password2", 10), // Hash the password
      role: "user",
      email: "user2@example.com",
    },
    // Add more users as needed
  ];

  await User.deleteMany({});
  await User.insertMany(users);
  console.log("Users seeded");
};

const seedRecipes = async () => {
  const recipes = [
    {
      name: "Spaghetti Bolognese",
      ingredients: [
        { name: "Spaghetti", quantity: "200g" },
        { name: "Ground Beef", quantity: "300g" },
        { name: "Tomato Sauce", quantity: "1 cup" },
      ],
      instructions:
        "Cook spaghetti. Brown the beef. Mix with tomato sauce. Combine with spaghetti.",
      duration: 30,
      serving: 4,
      img: "./images/demo-recipes.png",
      userId: null, // Will be set later
    },
    {
      name: "Chicken Curry",
      ingredients: [
        { name: "Chicken", quantity: "500g" },
        { name: "Curry Powder", quantity: "2 tbsp" },
        { name: "Coconut Milk", quantity: "1 can" },
      ],
      instructions:
        "Cook chicken. Add curry powder and coconut milk. Simmer until done.",
      duration: 40,
      serving: 4,
      img: "./images/demo-recipes.png",
      userId: null, // Will be set later
    },
    {
      name: "Beef Stew",
      ingredients: [
        { name: "Beef", quantity: "500g" },
        { name: "Potatoes", quantity: "3" },
        { name: "Carrots", quantity: "2" },
      ],
      instructions:
        "Brown beef. Add potatoes and carrots. Simmer until tender.",
      duration: 120,
      serving: 6,
      img: "./images/demo-recipes.png",
      userId: null, // Will be set later
    },
    {
      name: "Vegetable Stir Fry",
      ingredients: [
        { name: "Broccoli", quantity: "1 head" },
        { name: "Bell Peppers", quantity: "2" },
        { name: "Soy Sauce", quantity: "3 tbsp" },
      ],
      instructions: "Stir fry vegetables. Add soy sauce. Serve with rice.",
      duration: 20,
      serving: 4,
      img: "./images/demo-recipes.png",
      userId: null, // Will be set later
    },
    {
      name: "Pancakes",
      ingredients: [
        { name: "Flour", quantity: "2 cups" },
        { name: "Milk", quantity: "1 cup" },
        { name: "Eggs", quantity: "2" },
      ],
      instructions: "Mix ingredients. Cook on griddle. Serve with syrup.",
      duration: 15,
      serving: 4,
      img: "./images/demo-recipes.png",
      userId: null, // Will be set later
    },
    {
      name: "Caesar Salad",
      ingredients: [
        { name: "Romaine Lettuce", quantity: "1 head" },
        { name: "Caesar Dressing", quantity: "1/2 cup" },
        { name: "Croutons", quantity: "1 cup" },
      ],
      instructions: "Toss lettuce with dressing and croutons. Serve chilled.",
      duration: 10,
      serving: 2,
      img: "./images/demo-recipes.png",
      userId: null, // Will be set later
    },
    {
      name: "Grilled Cheese Sandwich",
      ingredients: [
        { name: "Bread", quantity: "2 slices" },
        { name: "Cheese", quantity: "2 slices" },
        { name: "Butter", quantity: "2 tbsp" },
      ],
      instructions:
        "Butter bread. Place cheese between slices. Grill until golden.",
      duration: 10,
      serving: 1,
      img: "./images/demo-recipes.png",
      userId: null, // Will be set later
    },
    {
      name: "Tomato Soup",
      ingredients: [
        { name: "Tomatoes", quantity: "4" },
        { name: "Onion", quantity: "1" },
        { name: "Garlic", quantity: "2 cloves" },
      ],
      instructions:
        "Cook tomatoes, onion, and garlic. Blend until smooth. Serve hot.",
      duration: 30,
      serving: 4,
      img: "./images/demo-recipes.png",
      userId: null, // Will be set later
    },
    {
      name: "Chocolate Cake",
      ingredients: [
        { name: "Flour", quantity: "2 cups" },
        { name: "Cocoa Powder", quantity: "1 cup" },
        { name: "Sugar", quantity: "1.5 cups" },
      ],
      instructions:
        "Mix ingredients. Bake at 350°F for 30 minutes. Cool and serve.",
      duration: 60,
      serving: 8,
      img: "./images/demo-recipes.png",
      userId: null, // Will be set later
    },
    {
      name: "Scrambled Eggs",
      ingredients: [
        { name: "Eggs", quantity: "4" },
        { name: "Milk", quantity: "1/4 cup" },
        { name: "Butter", quantity: "1 tbsp" },
      ],
      instructions: "Whisk eggs and milk. Cook in buttered pan until set.",
      duration: 5,
      serving: 2,
      img: "./images/demo-recipes.png",
      userId: null, // Will be set later
    },
  ];

  // Assign userId to each recipe
  const users = await User.find({});
  recipes.forEach((recipe, index) => {
    recipe.userId = users[index % users.length]._id;
  });

  await Recipe.deleteMany({});
  await Recipe.insertMany(recipes);
  console.log("Recipes seeded");
};

const seedDatabase = async () => {
  await connectDB();
  await seedUsers();
  await seedRecipes();
  mongoose.connection.close();
};

seedDatabase().catch((err) => {
  console.error("Seeding error:", err);
  mongoose.connection.close();
});
