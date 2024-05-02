import request from "supertest";
import { app } from "../app.js";

// JWT token to be used in the tests
let token = "";
let userId = "";

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

    // Save the userId for later use
    userId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      admin: 0,
      created_at: expect.any(String),
      id: expect.any(String),
      username: "testuser",
    });
    expect(response.type).toBe("application/json");
  });

  it("should return 409 when the username is already in use", async () => {
    const response = await request(app).post("/api/users/signup").send({
      username: "testuser",
      password: "testpassword",
    });

    expect(response.status).toBe(409);
    expect(response.type).toBe("application/json");
  });

  it("should return 400 when the username is too short", async () => {
    const response = await request(app).post("/api/users/signup").send({
      username: "us",
      password: "testpassword",
    });

    expect(response.status).toBe(400);
    expect(response.type).toBe("application/json");
  });

  it("should return 400 when the password is too short", async () => {
    const response = await request(app).post("/api/users/signup").send({
      username: "testuser",
      password: "pass",
    });

    expect(response.status).toBe(400);
    expect(response.type).toBe("application/json");
  });

  it("should return 400 when the username is missing", async () => {
    const response = await request(app).post("/api/users/signup").send({
      password: "testpassword",
    });

    expect(response.status).toBe(400);
    expect(response.type).toBe("application/json");
  });

  it("should return 400 when the password is missing", async () => {
    const response = await request(app).post("/api/users/signup").send({
      username: "testuser",
    });

    expect(response.status).toBe(400);
    expect(response.type).toBe("application/json");
  });
});

describe("POST /api/users/login", () => {
  it("should return a JWT", async () => {
    const response = await request(app).post("/api/users/login").send({
      username: "testuser",
      password: "testpassword",
    });

    // Save the token
    token = response.body.token;

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.type).toBe("application/json");
  });

  it("should return 401 when the password is wrong", async () => {
    const response = await request(app).post("/api/users/login").send({
      username: "testuser",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.type).toBe("application/json");
  });

  it("should return 401 when the user does not exist", async () => {
    const response = await request(app).post("/api/users/login").send({
      username: "nonexistinguser",
      password: "testpassword",
    });

    expect(response.status).toBe(401);
    expect(response.type).toBe("application/json");
  });

  it("should return 400 when the username is missing", async () => {
    const response = await request(app).post("/api/users/login").send({
      password: "testpassword",
    });

    expect(response.status).toBe(400);
    expect(response.type).toBe("application/json");
  });

  it("should return 400 when the password is missing", async () => {
    const response = await request(app).post("/api/users/login").send({
      username: "testuser",
    });

    expect(response.status).toBe(400);
    expect(response.type).toBe("application/json");
  });

  it("should return 400 when the username is too short", async () => {
    const response = await request(app).post("/api/users/login").send({
      username: "us",
      password: "testpassword",
    });

    expect(response.status).toBe(400);
    expect(response.type).toBe("application/json");
  });

  it("should return 400 when the password is too short", async () => {
    const response = await request(app).post("/api/users/login").send({
      username: "testuser",
      password: "pass",
    });

    expect(response.status).toBe(400);
    expect(response.type).toBe("application/json");
  });
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

describe("GET /api/users/:id", () => {
  it("should return a user when authorized with a JWT", async () => {
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      created_at: expect.any(String),
      admin: 0,
      id: userId,
      username: "testuser",
    });
    expect(response.type).toBe("application/json");
  });

  it("should return 401 when unauthorized", async () => {
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(401);
    expect(response.type).toBe("application/json");
  });

  it("should return 401 with an invalid token", async () => {
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .set("Authorization", "Bearer " + "invalidtoken");
    expect(response.status).toBe(401);
    expect(response.type).toBe("application/json");
  });

  it("should return 404 when the user does not exist", async () => {
    const response = await request(app)
      .get("/api/users/1")
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(404);
    expect(response.type).toBe("application/json");
  });
});
