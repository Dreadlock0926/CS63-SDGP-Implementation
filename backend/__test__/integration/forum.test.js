const request = require("supertest");
const BASE = "http://localhost:8000";
const testID = "65fde2b2c656d10ff1ce4ee4";

describe("POST /forum", () => {
  const search1 = "tqtwt";
  const search2 = "Pure Mathematics I";

  it("should return error when searching with invalid parameters", async () => {
    const response = await request(BASE)
      .post("/forum")
      .send({ searchParams: search1 });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Error fetching forums",
    });
  });

  it("should return forums when searching with valid parameters", async () => {
    const response = await request(BASE)
      .post("/forum")
      .send({ searchParams: search2 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe("POST /forum/search", () => {
  const search = "c";
  const search2 = "t";

  it("should return 'No results found!' when no results are found", async () => {
    const response = await request(BASE).post("/forum/search").send({ search });
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ Alert: "No results found!" });
  });

  it("should return results when searching with valid parameters", async () => {
    const response = await request(BASE)
      .post("/forum/search")
      .send({ search: search2 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe("PUT /forum/:id", () => {
  it("should return error when required fields are not filled", async () => {
    const response = await request(BASE).put(`/forum/${testID}`).send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ Alert: "No Answer or ID Provided!" });
  });

  it("should return error when invalid ID is provided", async () => {
    const response = await request(BASE).put(`/forum/qowktqoktwtkwt`).send({});
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ Alert: "Invalid ID" });
  });

  it("should update forum post when valid ID and answer are provided", async () => {
    const response = await request(BASE)
      .put(`/forum/${testID}`)
      .send({ answer: "Updated answer" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe("DELETE /forum/:id", () => {
  it("should return error when no ID is provided", async () => {
    const response = await request(BASE).delete("/forum/");
    expect(response.statusCode).toBe(404); // Assuming 404 for this case
  });

  it("should return error when invalid ID is provided", async () => {
    const response = await request(BASE).delete(`/forum/qowktqoktwtkwt`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ Alert: "Invalid ID" });
  });

  it("should delete forum post when valid ID is provided", async () => {
    const response = await request(BASE).delete(`/forum/${testID}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ Alert: `Deleted ${testID}` });
  });
});
