// import { faker } from "@faker-js/faker";

// // Generate dummy reviews
// const generateReviews = (users, recipes, count = 50) => {
//   return Array.from({ length: count }, () => ({
//     id: faker.number.int({ min: 1, max: 1000 }),
//     userId: faker.helpers.arrayElement(users).id,
//     recipeId: faker.helpers.arrayElement(recipes).id,
//     rating: faker.number.int({ min: 1, max: 5 }),
//     comment: faker.lorem.sentence(),
//     createdAt: faker.date.recent(),
//   }));
// };

// // Generate all dummy data
// const generateDummyData = () => {
//   const reviews = generateReviews(users, recipes);

//   // Add a single test user with photo
//   const testUser = {
//     id: 9999,
//     username: "testuser",
//     email: "testuser@example.com",
//     password: "password123",
//     points: 500,
//     photo: faker.image.avatar(),
//     createdAt: new Date("2023-01-01"),
//     updatedAt: new Date("2023-01-01"),
//   };

//   users.push(testUser);

//   return { users, recipes, purchases, reviews };
// };

// export default generateDummyData;
