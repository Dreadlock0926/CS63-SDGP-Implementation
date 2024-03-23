// Import mongoose directly in your test if you're using it for ObjectId creation
const { default: mongoose } = require('mongoose');
const { getMarks, topicalMarks,totalhours} = require("../handlers/testProgression");
const examModel = require("../models/exam");
const progressionModel = require("../models/user");

jest.mock("../models/exam", () => ({
  find: jest.fn(),
  
}));



const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res); // Use `.send()` if that's what your implementation uses
  res.json = jest.fn().mockReturnValue(res); // Ensure this is here if you're using `.json()` somewhere
  return res;
};

describe("Get Marks", () => {
  it("should return 200 and the response data for a successful fetch for feedback exams", async () => {
    const validObjectId = new mongoose.Types.ObjectId().toString();
    const mockReq = {
      body: {
        useRef: validObjectId
      }
    };
    const res = mockResponse();

    examModel.find.mockResolvedValue([
      { _id: new mongoose.Types.ObjectId(), userRef: mockReq.body.useRef, examType: "Feedback", score: 85 }
    ]);

    await getMarks(mockReq, res);

    expect(examModel.find).toHaveBeenCalledWith({
      userRef: new mongoose.Types.ObjectId(mockReq.body.useRef),
      examType: "Feedback"
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(expect.any(Array)); // assuming your actual implementation uses `.send()`
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and the response data for a successful fetch for feedback exams",async()=>{
    const validObjectId = new mongoose.Types.ObjectId().toString();
    const mockReq = {
      body: {
        useRef: validObjectId 
      }
    };
    const res = mockResponse();

    examModel.find.mockResolvedValue([
      { _id: new mongoose.Types.ObjectId(), userRef: mockReq.body.useRef, examType: "Topical", score: 85 }
    ]);

    await topicalMarks(mockReq, res);

    expect(examModel.find).toHaveBeenCalledWith({
      userRef: new mongoose.Types.ObjectId(mockReq.body.useRef),
      examType: "Topical"
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(expect.any(Array)); // assuming your actual implementation uses `.send()`

  })


});


jest.mock('../models/user', () => ({
  findById: jest.fn(),
}));

describe('totalhours', () => {
  it('calculates and returns total hours correctly', async () => {
    // Prepare
    const mockReq = { body: { _id: 'someUserId' } };
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    const mockUser = {
      _id: 'someUserId',
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-03'),
    };

    // Mock implementation
    progressionModel.findById.mockResolvedValue(mockUser);

    // Execute
    await totalhours(mockReq, mockRes);

    // Assert
    expect(progressionModel.findById).toHaveBeenCalledWith('someUserId');
    expect(mockRes.json).toHaveBeenCalledWith({ hours: expect.any(Number) });
  });

  // Reset mocks after each test
  afterEach(() => jest.clearAllMocks());
});