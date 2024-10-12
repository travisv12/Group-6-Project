const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Product = require("../Models/Product");

describe("Product API", () => {
  let productId;

  beforeAll(async () => {
    // Create a sample product in the database before running the tests
    const product = new Product({
      name: "Test Product",
      price: 10.0,
      discountedPrice: 8.0,
      store: "Test Store",
      location: "Aisle 1",
      img: "test-product-image.jpg",
    });

    const savedProduct = await product.save();
    productId = savedProduct._id;
  });

  afterAll(async () => {
    // Clean up the product after tests run
    await Product.deleteMany({});
  });

  it("should retrieve all products", async () => {
    const res = await api.get("/api/products");

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should retrieve a single product by ID", async () => {
    const res = await api.get(`/api/products/${productId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("price");
    expect(res.body._id).toBe(productId.toString());
  });

  it("should return 404 if product is not found", async () => {
    const nonExistentProductId = "507f1f77bcf86cd799439000"; // Non-existent ID
    const res = await api.get(`/api/products/${nonExistentProductId}`);

    expect(res.status).toBe(404);
  });
});
