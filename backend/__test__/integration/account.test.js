const express = require("express");
const request = require("supertest");

const BASE = "http://localhost:8000";

describe("POST /register", () => {
  const existingAccount = {
    username: "test",
  };

  const account = {
    username: "test2",
  };

  it("not sending passsword in the req body", async () => {
    const response = await request(BASE)
      .post("/register")
      .send(existingAccount);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ Alert: "Username/Password Missing!" });
  });

  it("sending an existing username", async () => {
    const response = await request(BASE)
      .post("/register")
      .send({ ...existingAccount, password: "test" });
    expect(response.statusCode).toBe(409);
    expect(response.body).toEqual({ Alert: "test Already Exists!" });
  });

  it("creating a new user", async () => {
    const response = await request(BASE)
      .post("/register")
      .send({ ...account, password: "test" });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ Alert: `test2 Registered!` });
  });

  it("creating a new user with the same username", async () => {
    const response = await request(BASE)
      .post("/register")
      .send({ ...account, password: "test" });
    expect(response.statusCode).toBe(409);
    expect(response.body).toEqual({
      Alert: `${account.username} Already Exists!`,
    });
  });

  it("logging in with the new user", async () => {
    const response = await request(BASE)
      .post("/login")
      .send({ username: account.username, password: "test" });
    expect(response.statusCode).toBe(200);
    expect(response.body.Alert).toEqual(`${account.username} logged in!`);
  });

  it("logging with wrong password", async () => {
    const response = await request(BASE)
      .post("/login")
      .send({ username: account.username, password: "wrong" });
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ Alert: "Unauthorized" });
  });

  it("deleting user without sending username", async () => {
    const response = await request(BASE).post("/user/deleteUser");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Username is required!" });
  });

  it("deleting user", async () => {
    const response = await request(BASE)
      .post("/user/deleteUser")
      .send({ username: account.username });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "User deleted successfully!" });
  });
});
