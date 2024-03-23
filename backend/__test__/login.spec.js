const loginUser = require("../handlers/testLogin");
const userModel = require("../models/user");

// Mock the userModel's findOne method
jest.mock('../models/user', () => ({
  findOne: jest.fn(),
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Helper to create a mock request object
const mockRequest = (body) => ({
  body,
  session: {}, // Add session object to simulate express-session
});

describe('login users', () => {
  it('should successfully log in a user', async () => {
    const req = mockRequest({
      username: "Rukshan",
      password: "1234"
    });
    const res = mockResponse();

    // Mock the response of userModel.findOne to simulate finding a user
    userModel.findOne.mockResolvedValue({
      username: "Rukshan",
      // In real scenario, you'd compare hashed passwords
    });

    await loginUser(req, res);

    // Check that the status and json response match the expected output
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      Alert: "Rukshan logged in!",
      username: "Rukshan",
      session: req.session.user,
      data: expect.any(Object) // or more specific expectations if you have the structure
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('if username or password is wrong it should display an error message',async()=>{
    const req = mockRequest({
      username:"Rukshan",
      password:""
    })
    const res = mockResponse();
    await loginUser(req,res)
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ Alert: "Username/Password Missing!" });

  })
  it('should return 400 if both username and password are missing',async()=>{
    const req = mockRequest({
      username:"",
      password:""
    })
    const res = mockResponse();
    await loginUser(req,res)
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ Alert: "Username/Password Missing!" });

  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 404 if the username does not exist', async () => {
    const req = mockRequest({
      username: "nonexistentUser", // A username that does not exist in the database
      password: "somePassword"
    });
    const res = mockResponse();

    // Mock the response of userModel.findOne to simulate not finding a user
    userModel.findOne.mockResolvedValue(null);

    await loginUser(req, res);

    // Verify the response for an invalid username attempt
    expect(userModel.findOne).toHaveBeenCalledWith({ username: "nonexistentUser" });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ Alert: "Invalid Username" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
