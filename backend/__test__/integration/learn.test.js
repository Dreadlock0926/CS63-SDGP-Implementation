const request = require("supertest");
const learningModel = require("../../models/learning");
const BASE = "http://localhost:8000";

describe("POST /resources", () => {
  const dummyData = {
    topic: "Pure Mathematics I",
    title: "testing",
    about: "yes",
    subtopic: "no",
    link: "something",
  };

  const dummyData2 = {
    topic: "Pure Mathematics I",
    about: "yes",
    subtopic: "no",
  };

  it("get learning resources", async () => {
    const response = await request(BASE).get("/register");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(response.data);
  });

  it("fields not filled", async () => {
    const response = await request(BASE).post("/resources").send(dummyData2);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      Alert: "Required fields not filled! (topic and title!)",
    });
  });

  it("title conflicting", async () => {
    const response = await request(BASE).post("/register").send(dummyData);
    expect(response.statusCode).toBe(409);
    expect(response.body).toEqual({
      Alert: "Title Already Exists!",
    });
  });

  it("user registered", async () => {
    const response = await request(BASE).post("/register").send(dummyData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      Alert: "Added Learning Resource to Learn",
    });
  });
});
