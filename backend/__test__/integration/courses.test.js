const request = require("supertest");

const BASE = "http://localhost:8000";

describe("POST /getModules", () => {
  it("should return 400 if courses is not an array", async () => {
    const response = await request(BASE)
      .post("/course/getModules")
      .send({ courses: "not an array" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Invalid courses data. Must be an array.",
    });
  });

  it("should return 200 if an empty array is passed", async () => {
    const response = await request(BASE)
      .post("/course/getModules")
      .send({ courses: [] });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("userInProgress");
    expect(response.body).toHaveProperty("userNotStarted");
  });

  it("should return 200 if request is successful", async () => {
    const response = await request(BASE)
      .post("/course/getModules")
      .send({ courses: ["p1", "s1"] });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("userInProgress");
    expect(response.body).toHaveProperty("userNotStarted");
  });
});

describe("POST /getLessons", () => {
  it("should return 400 if topic is missing", async () => {
    const response = await request(BASE).post("/course/getLessons").send({});
    expect(response.statusCode).toBe(400);
  });

  it("should return 404 if topic is not found", async () => {
    const response = await request(BASE)
      .post("/course/getLessons")
      .send({ topic: "not-found" });
    expect(response.statusCode).toBe(404);
  });

  it("should return 200 if request is successful", async () => {
    const response = await request(BASE)
      .post("/course/getLessons")
      .send({ topic: "p1" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("POST /getProgress", () => {
  it("should return 400 if user or source key is missing", async () => {
    const response = await request(BASE).post("/course/getProgress").send({});
    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if userId is not in the valid format", async () => {
    const response = await request(BASE)
      .post("/course/getProgress")
      .send({ userID: "not-found", sourceKey: "p1" });
    expect(response.statusCode).toBe(400);
  });

  it("should return 200 if request is successful", async () => {
    const response = await request(BASE)
      .post("/course/getProgress")
      .send({ userID: "65f86f434b9403f9d70d8aa3", sourceKey: "p1" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        // Maintain structure check
        completedLessonCount: expect.any(Number),
        noOfLessonCount: expect.any(Number),
        sourceKey: expect.any(String),
      })
    );
  });
});
