jest.mock("../models/question", () => ({
  findOne: jest.fn(),
}));

const questionModel = require("../models/question");
const {getQuestionId } = require("../handlers/testgetQuestion");

describe("getQuestionId", () => {
  it("should return 200 and the question data for a successful fetch", async () => {
    // Mock request and response objects
    const req = {
      body: {
        questionID: "s1_tnd_2_w_2022_2", // Provide a sample questionID
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(), // Allows chaining .status().json()
    };

    // Mock data to be returned by questionModel.findOne
    const mockQuestionData = {
      questionID: "s1_tnd_2_w_2022_2",
      content: "What is 2+2 ",
      // Add more fields as per your question model
    };

    // Set up the mock implementation for findOne to return the mock data
    questionModel.findOne.mockResolvedValue(mockQuestionData);

    // Execute the function with the mocked request and response
    await getQuestionId(req, res);

    // Assertions to ensure the behavior is as expected
    expect(questionModel.findOne).toHaveBeenCalledWith({ questionID: "s1_tnd_2_w_2022_2" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockQuestionData);
  });

  // Reset mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });
});