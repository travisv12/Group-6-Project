const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../Models/users");

describe("Recipe API", () => {
  let accessToken;
  let recipeId;

  beforeAll(async () => {
    // Login to get access token
    const res = await api.post("/api/users/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    if (res.status !== 200) {
      throw new Error("Failed to login");
    }

    accessToken = res.body.accessToken;
  });

  it("should create a new recipe", async () => {
    const res = await api
      .post("/api/add")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Test Recipe",
        ingredients: [
          { name: "Ingredient 1", quantity: "1 cup" },
          { name: "Ingredient 2", quantity: "2 tbsp" },
        ],
        instructions: "Mix ingredients and cook.",
        duration: 30,
        serving: 4,
        img: "http://example.com/image.png",
      });

    expect(res.status).toBe(201);
    recipeId = res.body._id;
  });

  it("should not add a recipe without name", async () => {
    const res = await api
      .post("/api/add")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        ingredients: [{ name: "Ingredient 1", quantity: "2 cups" }],
        instructions: "Mix everything",
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should get all recipes", async () => {
    const res = await api.get("/api/recipes/all");

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should get user recipes", async () => {
    const res = await api
      .get("/api/user/recipes")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should get a recipe by ID", async () => {
    const res = await api
      .get(`/api/user/recipe/${recipeId}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name");
  });

  it("should update a recipe", async () => {
    const res = await api
      .put(`/api/user/recipe/update/${recipeId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Updated Recipe",
        ingredients: [{ name: "Updated Ingredient", quantity: "1 cup" }],
        instructions: "Updated instructions.",
        duration: 45,
        serving: 2,
        img: "http://example.com/updated-image.png",
      });

    expect(res.status).toBe(200);
  });

  it("should delete a recipe", async () => {
    const res = await api
      .delete(`/api/user/recipe/delete/${recipeId}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
  });
});
