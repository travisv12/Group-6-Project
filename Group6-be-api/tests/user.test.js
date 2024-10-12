const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../Models/users");

beforeAll(async () => {
  await User.deleteMany({});
});

describe("User Routes", () => {
  describe("POST /api/users/signup", () => {
    it("should signup a new user with valid credentials", async () => {
      // Arrange
      const userData = {
        username: "testUser", // Using the specified username
        email: "testuser@example.com", // Using the specified email
        password: "password123", // Using the specified password
      };

      // Act
      const result = await api.post("/api/users/signup").send(userData);

      // Assert
      expect(result.status).toBe(201);
      expect(result.body).toHaveProperty("userId");
      expect(result.body).toHaveProperty("accessToken");
      expect(result.body).toHaveProperty("refreshToken");
    });
    it("should return an error", async () => {
      const invalidUserData = {
        username: "InvalidUserName",
        email: "", // Missing email to trigger an error
        password: "invalidPassword",
      };

      const result = await api.post("/api/users/signup").send(invalidUserData);
      console.log("error", result.body);
      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });
  });

  describe("POST /api/users/login", () => {
    it("should login a user with valid credentials", async () => {
      // Arrange
      const userData = {
        email: "testuser@example.com", // Using the specified email
        password: "password123", // Using the specified password
      };

      // Act
      const result = await api.post("/api/users/login").send(userData);

      // Assert
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("userId");
      expect(result.body).toHaveProperty("accessToken");
      expect(result.body).toHaveProperty("refreshToken");
    });
    it("should return an error with invalid credentials", async () => {
      const invalidLoginData = {
        email: "wrongemail@example.com",
        password: "wrongpassword",
      };

      const result = await api.post("/api/users/login").send(invalidLoginData);

      expect(result.status).toBe(401);
      expect(result.body).toHaveProperty("error");
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
