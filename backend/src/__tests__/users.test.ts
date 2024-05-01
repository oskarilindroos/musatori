import request from "supertest";
import { app } from "../app.js";

// JWT token to be used in the tests
let token = "";

/**
 * Tests for the users API.
 * The tests are written in a way that they depend on each other and are ran sequantially.
 **/

describe("POST /api/users/signup", () => {
  it("should return the newly created user", async () => {
    const response = await request(app).post("/api/users/signup").send({
      username: "testuser",
      password: "testpassword",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      createdAt: expect.any(String),
      id: expect.any(String),
      username: "testuser",
    });
    expect(response.type).toBe("application/json");
  });
});

describe("POST /api/users/login", () => {
  it("should return a JWT", async () => {
    const response = await request(app).post("/api/users/login").send({
      username: "testuser",
      password: "testpassword",
    });

    token = response.body.token;

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.type).toBe("application/json");
  });

  // it("should return 401 when the password is wrong", async () => {
  //   const response = await request(app).post("/api/users/login").send({
  //     username: "testuser",
  //     password: "wrongpassword",
  //   });
  //
  //   expect(response.status).toBe(401);
  //   expect(response.type).toBe("application/json");
  // });
  //
  // it("should return 401 when the user does not exist", async () => {
  //   const response = await request(app).post("/api/users/login").send({
  //     username: "nonexistinguser",
  //     password: "testpassword",
  //   });
  //
  //   expect(response.status).toBe(401);
  //   expect(response.type).toBe("application/json");
  // });
});

describe("GET /api/users", () => {
  it("should return a list of users when authorized with a JWT", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.type).toBe("application/json");
  });

  it("should return 401 when unauthorized", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(401);
    expect(response.type).toBe("application/json");
  });
});
