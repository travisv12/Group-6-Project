import { faker } from "@faker-js/faker";

// Generate dummy users
const generateUsers = (count = 10) => {
  return Array.from({ length: count }, () => ({
    id: faker.number.int({ min: 1, max: 1000 }),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    points: faker.number.int({ min: 0, max: 1000 }),
    photo: faker.image.avatar(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }));
};

// Generate dummy recipes
const generateRecipes = (count = 20) => {
  return Array.from({ length: count }, () => ({
    id: faker.number.int({ min: 1, max: 1000 }),
    recipeName: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    ingredients: faker.lorem.words(10),
    expiryDate: faker.date.future(),
    price: parseFloat(faker.commerce.price({ min: 5, max: 50, dec: 2 })),
    duration: faker.number.int({ min: 15, max: 120 }),
    instruction: faker.lorem.paragraphs(2),
    serving: faker.number.int({ min: 1, max: 6 }),
    image: faker.image.url(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }));
};

// Generate dummy purchases
const generatePurchases = (users, recipes, count = 30) => {
  return Array.from({ length: count }, () => ({
    id: faker.number.int({ min: 1, max: 1000 }),
    userId: faker.helpers.arrayElement(users).id,
    recipeId: faker.helpers.arrayElement(recipes).id,
    purchaseDate: faker.date.recent(),
    pointsSpent: faker.number.int({ min: 10, max: 100 }),
  }));
};

// Generate dummy reviews
const generateReviews = (users, recipes, count = 50) => {
  return Array.from({ length: count }, () => ({
    id: faker.number.int({ min: 1, max: 1000 }),
    userId: faker.helpers.arrayElement(users).id,
    recipeId: faker.helpers.arrayElement(recipes).id,
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.lorem.sentence(),
    createdAt: faker.date.recent(),
  }));
};

// Generate all dummy data
const generateDummyData = () => {
  const users = generateUsers();
  const recipes = generateRecipes();
  const purchases = generatePurchases(users, recipes);
  const reviews = generateReviews(users, recipes);

  // Add a single test user with photo
  // const testUser = {
  //   id: 9999,
  //   username: "testuser",
  //   email: "testuser@example.com",
  //   password: "password123",
  //   points: 500,
  //   photo: faker.image.avatar(),
  //   createdAt: new Date("2023-01-01"),
  //   updatedAt: new Date("2023-01-01"),
  // };

  // users.push(testUser);

  return { users, recipes, purchases, reviews };
};

export default generateDummyData;
