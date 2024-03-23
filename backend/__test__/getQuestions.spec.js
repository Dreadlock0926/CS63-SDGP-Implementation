jest.mock("../models/question", () => ({
  findOne: jest.fn(),
  find: jest.fn()
}));

const questionModel = require("../models/question");
const { getQuestionId ,getAllQuestions } = require("../handlers/testgetQuestion");

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

  beforeAll(() => {
    // Mock the find method before all tests
    questionModel.find.mockResolvedValue([
      { questionID: 'module1_question1' },
      { questionID: 'module1_question2' }
    ]);
  });

  afterAll(() => {
    // Restore the mock to its original state
    jest.restoreAllMocks();
  });


  it('should return 200 and the question data for a successful fetch', async () => {
    const moduleID = 'module1';
    const response = await getAllQuestions(moduleID);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      { questionID: 'module1_question1' },
      { questionID: 'module1_question2' }
    ]);
    // Ensure the find method was called with the correct parameters
    expect(questionModel.find).toHaveBeenCalledWith({ questionID: new RegExp("^" + moduleID) }, { questionID: 1, _id: 0 });

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
  
    beforeAll(() => {
      // Mock the find method before all tests
      questionModel.find.mockResolvedValue([
        { questionID: 'module1_question1' },
        { questionID: 'module1_question2' }
      ]);
    });
  
    afterAll(() => {
      // Restore the mock to its original state
      jest.restoreAllMocks();
    });
  });

  
});

describe("getAllQuestions", () => {
  it("should return 200 and module data for a successful fetch", async () => {
    // Mock request and response objects
    const req = {
      body: {
        moduleID: "validModuleId", // Provide a sample moduleID
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(), // Allows chaining .status().json()
    };

    // Mock data to be returned by questionModel.find
    const mockModuleData = [
      { questionID: "module1_question1" },
      { questionID: "module1_question2" },
      // Add more objects as per your module data structure
    ];

    // Set up the mock implementation for find to return the mock data
    questionModel.find.mockResolvedValue(mockModuleData);

    // Execute the function with the mocked request and response
    await getAllQuestions(req, res);

    // Assertions to ensure the behavior is as expected
    expect(questionModel.find).toHaveBeenCalledWith(
      { questionID: new RegExp("^validModuleId") },
      { questionID: 1, _id: 0 }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockModuleData);
  });

  // Reset mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });
});