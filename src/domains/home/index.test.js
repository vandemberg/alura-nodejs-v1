import request from "supertest";
import { app } from "../../helper.js";

describe("Home", () => {
  test("should return a welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Welcome to the Bookstore API");
  });
});
