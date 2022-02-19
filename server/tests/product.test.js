const app = require("../server");
const mongoose = require("mongoose");
const request = require("supertest");

jest.setTimeout(60000);

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Test Products API", () => {
  describe("Add Product", () => {
    it("Add new product", async () => {
      const response = await request(app).post("/product").send({
        productName: "Maxi Dresses",
        picture:
          "https://hm-media-prod.s3.amazonaws.com/pub/media/catalog/product/medium/fac8a26f526663ce9a41119a4a08b0a2a400b314_xxl-1.jpg",
        category: "Dresses",
        productDescription:
          "In softly draping viscose jersey with narrow, tie-top shoulder straps. Unlined",
        price: "650",
        quantityStock: "20",
      });
      expect(response.statusCode).toBe(201);
    });
  });

  describe("Edit Product", () => {
    it("edit product", async () => {
      const response = await request(app).put("/product").send({
        _id: "61445c058e15f83148fd2394",
        productName: "Maxi Dresses 2",
        picture:
          "https://hm-media-prod.s3.amazonaws.com/pub/media/catalog/product/medium/fac8a26f526663ce9a41119a4a08b0a2a400b314_xxl-1.jpg",
        category: "Dresses",
        productDescription:
          "In softly draping viscose jersey with narrow, tie-top shoulder straps. Unlined",
        price: "650",
        quantityStock: "20",
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Delete Product", () => {
    it("delete product", async () => {
      const response = await request(app).delete("/product");
      expect(response.statusCode).toBe(200);
    });
  });
});
