import request from "supertest";
import { app } from "../app.js";
import jest from "jest";

// JWT token to be used in the tests
let token = "";
let userId = "";

const exampleListing = {
  title: "Test Listing",
  description: "This is a test listing",
  location: "Test Location",
  price: 100,
  listing_category_id: 1,
  listing_type_id: 1,
  imageUrls: ["https://example.com/image1.jpg"],
};

beforeAll(async () => {
  // Create a new test user
  const signUpResponse = await request(app).post("/api/users/signup").send({
    username: "testuser",
    password: "testpassword",
  });

  // Save the userId for later use
  userId = signUpResponse.body.id;

  // Login the test user
  const loginResponse = await request(app).post("/api/users/login").send({
    username: "testuser",
    password: "testpassword",
  });

  // Save the token
  token = loginResponse.body.token;
});

describe("POST /api/listings", () => {
  it("should return the id of the created listing", async () => {
    const response = await request(app)
      .post("/api/listings")
      .set("Authorization", `Bearer ${token}`)
      .send(exampleListing);

    expect(response.status).toBe(201);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({
      id: expect.any(Number),
    });
    expect(response.body.id).toBe(1);
  });

  it("should return 401 when the user is not authenticated", async () => {
    const response = await request(app)
      .post("/api/listings")
      .send(exampleListing);

    expect(response.status).toBe(401);
    expect(response.type).toBe("application/json");
  });
});

describe("GET /api/listings", () => {
  it("should return an array of listings", async () => {
    const response = await request(app).get("/api/listings");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toEqual(1);
  });
});

describe("GET /api/listings/:id", () => {
  it("should return a listing by id", async () => {
    const response = await request(app).get("/api/listings/1");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.id).toEqual(1);
  });

  it("should return 404 when the listing is not found", async () => {
    const response = await request(app).get("/api/listings/2");

    expect(response.status).toBe(404);
    expect(response.type).toBe("application/json");
  });
});

describe("GET /api/listings/categories", () => {
  it("should return an array of listing categories", async () => {
    const response = await request(app).get("/api/listings/categories");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body[0].id).toEqual(1);
    expect(response.body).toHaveLength(16);
  });
});

describe("GET /api/listings/types", () => {
  it("should return an array of listing types", async () => {
    const response = await request(app).get("/api/listings/types");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body[0].id).toEqual(1);
    expect(response.body).toHaveLength(3);
  });
});

// TODO: PUT tests

// describe("PUT /api/listings/:id", () => {
//   it("should update a listing by id", async () => {
//     const response = await request(app)
//       .put("/api/listings/1")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         title: "Updated Listing",
//         description: "This is an updated test listing",
//         location: "Updated Location",
//         price: 200,
//         listing_category_id: 2,
//         listing_type_id: 2,
//       });
//
//     expect(response.status).toBe(200);
//     expect(response.type).toBe("application/json");
//     expect(response.body.title).toEqual("Updated Listing");
//     expect(response.body.description).toEqual(
//       "This is an updated test listing",
//     );
//     expect(response.body.location).toEqual("Updated Location");
//     expect(response.body.price).toEqual(200);
//     expect(response.body.listing_category_id).toEqual(2);
//     expect(response.body.listing_type_id).toEqual(2);
//   });
//
//   it("should return 404 when the listing is not found", async () => {
//     const response = await request(app)
//       .put("/api/listings/2")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         title: "Updated Listing",
//         description: "This is an updated test listing",
//         location: "Updated Location",
//         price: 200,
//         listing_category_id: 2,
//         listing_type_id: 2,
//       });
//
//     expect(response.status).toBe(404);
//     expect(response.type).toBe("application/json");
//   });
//
//   it("should return 401 when the user is not authenticated", async () => {
//     const response = await request(app).put("/api/listings/1").send({
//       title: "Updated Listing",
//       description: "This is an updated test listing",
//       location: "Updated Location",
//       price: 200,
//       listing_category_id: 2,
//       listing_type_id: 2,
//     });
//
//     expect(response.status).toBe(401);
//     expect(response.type).toBe("application/json");
//   });
// });

describe("DELETE /api/listings/:id", () => {
  it("should delete a listing by id", async () => {
    const response = await request(app)
      .delete("/api/listings/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should return 404 when the listing is not found", async () => {
    const response = await request(app)
      .delete("/api/listings/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.type).toBe("application/json");
  });

  it("should return 401 when the user is not authenticated", async () => {
    const response = await request(app).delete("/api/listings/1");

    expect(response.status).toBe(401);
    expect(response.type).toBe("application/json");
  });
});
