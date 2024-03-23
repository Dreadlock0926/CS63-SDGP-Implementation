const sinon = require("sinon");
const request = require("supertest");
const { topicsModel } = require("../../models/topics");

const BASE = "http://localhost:8000";

describe("POST /updateTopics", () => {
  let mockTopicsModel;

  beforeEach(() => {
    mockTopicsModel = sinon.mock(topicsModel); // Mock the topics model
  });

  afterEach(() => {
    mockTopicsModel.restore(); // Restore original behavior
  });

  it("should update topic lessons and return a success message (mocked)", async () => {
    const sourceKey = "existing-source-key";
    const lessonTitleArr = ["Lesson 1", "Lesson 2"];
    const topic = "Updated Topic";

    const expectedUpdatedTopic = {
      // Mock the expected updated topic
      sourceKey,
      topicLesson: [
        {
          topic,
          lessons: lessonTitleArr.map((lessonTitle) => ({
            lessonTitle,
            lessonBody: {},
          })),
        },
      ],
    };

    mockTopicsModel
      .expects("findOne")
      .returns(Promise.resolve(expectedUpdatedTopic)); // Mock findOne behavior

    const response = await request(BASE)
      .post("/updateTopics")
      .send({
        sourceKey: "existing-source-key",
        lessonTitleArr: ["Lesson 1", "Lesson 2"],
        topic: "Updated Topic",
      });

    console.log(response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Topic lessons updated successfully!",
    });

    // No cleanup needed as data isn't modified in the real database
  });

  // ... other test cases with mocked mongoose operations
});
