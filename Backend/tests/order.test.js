const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../Models/users");

describe("Order API", () => {
  let accessToken;
  let orderId;
  let userId;

    const product1 = {
      _id: "507f1f77bcf86cd799439011",
      name: "Greek Yogurt",
      price: 3.0,
      discountedPrice: 2.7,
      store: "S-Market",
      location: "Aisle 24",
      img: "../../../public/images/greekyogurt.jpeg",
    };

    const product2 = {
      _id: "507f1f77bcf86cd799439012",
      name: "Almonds",
      price: 5.5,
      discountedPrice: 5.0,
      store: "Prisma",
      location: "Aisle 25",
      img: "../../../public/images/almonds.jpg",
    };

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
    userId = res.body.userId;
  });

  it("should create a new order", async () => {
    const res = await api
      .post("/api/orders/checkout")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        cart: [
          { product: { id: product1._id }, quantity: 2 },
          { product: { id: product2._id }, quantity: 1 },
        ],
        cartTotal: 100,
        earnedPoints: 10,
      });

    expect(res.status).toBe(201);
    orderId = res.body._id;
  });

  it("should not create an order without token", async () => {
    const res = await api.post("/api/orders/checkout").send({
      cart: [
        { product: { id: product1._id }, quantity: 2 },
        { product: { id: product2._id }, quantity: 1 },
      ],
      cartTotal: 100,
      earnedPoints: 10,
    });

    expect(res.status).toBe(401);
  });

  it("should get user orders", async () => {
    const res = await api
      .get(`/api/orders/my-purchases/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should not get user orders without token", async () => {
    const res = await api.get(`/api/orders/my-purchases/${userId}`);

    expect(res.status).toBe(401);
  });

  it("should get order details", async () => {
    const res = await api
      .get(`/api/orders/order/${orderId}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("userId");
  });

  it("should not get order details without token", async () => {
    const res = await api.get(`/api/orders/order/${orderId}`);

    expect(res.status).toBe(401);
  });
});
