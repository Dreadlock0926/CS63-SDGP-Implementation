const request = require("supertest");
const learningModel = require("../../models/learning");
const BASE = "http://localhost:8000";
const testID = "65fde2b2c656d10ff1ce4ee4";

describe("POST /forum", () => {
  const search1 = "tqtwt";
  const search2 = "Pure Mathematics I";

  it("error", async () => {
    const response = await request(BASE)
      .post("/forum")
      .send({ searchParams: search1 });
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      message: "Error fetching forums",
    });
  });

  it("works", async () => {
    const response = await request(BASE)
      .post("/forum")
      .send({ searchParams: search2 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(response.data);
  });
});

describe("search", () => {
  const search = "c";
  const search2 = "t";
  it("no results found", async () => {
    const response = await request(BASE).post("/forum/search").send(search);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ Alert: "No results found!" });
  });

  it("results found", async () => {
    const response = await request(BASE).post("/forum/search").send(search2);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(response.data);
  });
});

describe("update id wise", () => {
  it("Required fields not filled", async () => {
    const response = await request(BASE).put(`/forum/${""}`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ Alert: "No Answer or ID Provided!" });
  });

  it("Invalid ID", async () => {
    const response = await request(BASE).put(`/forum/${"qowktqoktwtkwt"}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ Alert: "No Answer or ID Provided!" });
  });

  it("Updated", async () => {
    const response = await request(BASE).put(`/forum/${testID}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ Alert: "Internal Server Error" });
  });
});

describe("delete id wise", () => {
    it("Required fields not filled", async () => {
      const response = await request(BASE).delete(`/forum/${""}`);
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ Alert: "No Answer or ID Provided!" });
    });
  
    it("Invalid ID", async () => {
      const response = await request(BASE).delete(`/forum/${"qowktqoktwtkwt"}`);
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ Alert: "No Answer or ID Provided!" });
    });
  
    it("Updated", async () => {
      const response = await request(BASE).delete(`/forum/${testID}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ Alert: "Internal Server Error" });
    });
  });