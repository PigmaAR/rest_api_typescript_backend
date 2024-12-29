import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  it("should create a new product", async () => {
    const response = await request(server)
      .post("/api/products")
      .send({ name: "Mouse - Testing", price: 300 });

    expect(response.status).toEqual(201);
    expect(response.status).toHaveProperty("data");

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
    expect(response.status).not.toHaveProperty("error");
  });
});
