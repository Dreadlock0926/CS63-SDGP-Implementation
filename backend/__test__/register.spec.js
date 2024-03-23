// import { registerUser } from "../handlers/testRegister"
const registerUser = require("../handlers/testRegister")
const userModel = require("../models/user");
jest.mock('../models/user', () => ({
  findOne: jest.fn(),
  create: jest.fn()
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('register users', () => {
  // Define mockRequest within the describe block
  const mockRequest = {
    body: {
      username: "Rukshan",
      password: "1234"
    }
  };

  it('should register user by username and password', async () => {
    const req = { ...mockRequest };
    const res = mockResponse();
  
    // Assuming the user does not exist, and we're simulating a successful creation
    userModel.findOne.mockResolvedValue(null);
    userModel.create.mockResolvedValue({
      // This mimics what the userModel.create function would return after creating a user.
      username: mockRequest.body.username,
      password: mockRequest.body.password, // In real case, password would likely be hashed
    });
    
    await registerUser(req, res);
  
    // The expectation should match the actual call to userModel.create within your registerUser function
    expect(userModel.create).toHaveBeenCalledWith({
      username: "Rukshan",
      password: "1234"
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ Alert: "Rukshan Registered!" });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call status 400 when username or password is missing', async () => {
    // This test simulates a request with missing username and password
    const req = { body: { username: "", password: "" } };
    const res = mockResponse();
    await registerUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ Alert: "Username/Password Missing!" });
  });

  it('should return 409 if the username already exists', async () => {
    const mockReq = {
      body: {
        username: "existingUser",
        password: "password123"
      }
    };
    const res = mockResponse();

    // Mock the findOne method to simulate finding an existing user
    userModel.findOne.mockResolvedValue({
      username: "existingUser",
      password: "password123" // The actual password would be hashed in a real scenario
    });

    await registerUser(mockReq, res);

    // Expectations
    expect(userModel.findOne).toHaveBeenCalledWith({ username: "existingUser" });
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ Alert: " existingUser Already Exists!" });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
