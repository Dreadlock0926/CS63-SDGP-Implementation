const { it } = require("node:test");
const request = require("supertest");
const BASE = "http://localhost:8000";

describe("exams", () => {
  it("should return 400 if exam details are missing", async () => {
    const response = await request(BASE).post("/exam/saveExam").send({
      // Sending empty body to trigger missing exam details
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ Alert: "Exam Details Missing!" });
  });

  it("should return 400 if exam reference ID is missing", async () => {
    const response = await request(BASE).post("/exam/getExam").send({
      // Sending empty body to trigger missing examRef
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      Alert: "The exam reference ID is missing.",
    });
  });

  it("should create a new exam and update user's examInfo", async () => {
    const response = await request(BASE)
      .post("/exam/saveExam")
      .send({
        examType: "Feedback",
        examQuestions: ["Question 1", "Question 2"],
        userRef: "65febde2ea793268b6b6a26d",
        examModule: "Module 1",
        examTopic: "Topic 1",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body[0].Alert).toBeDefined();
  });

  it("should return 400 if user reference ID is missing", async () => {
    const response = await request(BASE).post("/exam/deleteExam").send({
      // Sending empty body to trigger missing userRef
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      Alert: "The user reference ID is missing.",
    });
  });

  it("should delete an exam and update user's examInfo", async () => {
    const response = await request(BASE).post("/exam/deleteExam").send({
      userRef: "65febde2ea793268b6b6a26d",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  // it("should return exam data for a given exam reference ID", async () => {
  //   // Assume examRef exists in the database
  //   const response = await request(BASE)
  //     .post("/exam/getExam")
  //     .send({
  //       examRef: "exam_id"
  //     });

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toBeDefined();
  // });

  // it("should return exam receipt for a given exam reference ID", async () => {
  //   // Assume examRef exists in the database
  //   const response = await request(BASE)
  //     .post("/exam/getReceipt")
  //     .send({
  //       examRef: "exam_id"
  //     });

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toBeDefined();
  // });

  // it("should return 400 if exam reference ID or user reference ID is missing", async () => {
  //   const response = await request(BASE)
  //     .post("/exam/updateExam")
  //     .send({
  //       // Sending empty body to trigger missing examRef and userRef
  //     });

  //   expect(response.statusCode).toBe(400);
  //   expect(response.body).toEqual({ Alert: "The exam reference ID is missing." });
  // });

  // it("should update exam data and user's exam history", async () => {
  //   // Assume examRef and userRef exist in the database
  //   const response = await request(BASE)
  //     .post("/exam/updateExam")
  //     .send({
  //       examRef: "exam_id",
  //       userRef: "user_id",
  //       marks: 80,
  //       totalMark: 100,
  //       correctQuestions: ["Question 1"],
  //       wrongQuestions: ["Question 2"],
  //       userAnswers: ["Answer 1", "Answer 2"]
  //     });

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toBeDefined();
  // });

  // it("should return 400 if userId is missing", async () => {
  //   const response = await request(BASE)
  //     .post("/exam/getExamHistory")
  //     .send({
  //       // Sending empty body to trigger missing userId
  //     });

  //   expect(response.statusCode).toBe(400);
  //   expect(response.text).toBe("Missing required field: userId");
  // });

  // it("should return exam history for a given user ID", async () => {
  //   // Assume userId exists in the database
  //   const response = await request(BASE)
  //     .post("/exam/getExamHistory")
  //     .send({
  //       userId: "user_id"
  //     });

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toBeDefined();
  // });

  // it("should return 400 if examId is missing", async () => {
  //   const response = await request(BASE)
  //     .post("/exam/getExamHistoryDetails")
  //     .send({
  //       // Sending empty body to trigger missing examId
  //     });

  //   expect(response.statusCode).toBe(400);
  //   expect(response.text).toBe("Missing required field: examId");
  // });

  // it("should return exam details for a given exam ID", async () => {
  //   // Assume examId exists in the database
  //   const response = await request(BASE)
  //     .post("/exam/getExamHistoryDetails")
  //     .send({
  //       examId: "exam_id"
  //     });

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toBeDefined();
  // });
});
