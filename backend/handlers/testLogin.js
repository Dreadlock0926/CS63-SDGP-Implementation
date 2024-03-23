const userModel = require("../models/user");

// Adjust the loginUser function to accept req and res as parameters
const loginUser = async (req, res) => {
  const { username, password } = req?.body;

  if (!username || !password) {
    return res.status(400).json({ Alert: "Username/Password Missing!" });
  }

  const validityUser = await userModel.findOne({ username });

  if (!validityUser) {
    return res.status(404).json({ Alert: "Invalid Username" });
  } else {
    // Simulating a successful password check for the sake of the example
    req.session.user = { username, maxAge: 60000 };
    return res.status(200).json({
      Alert: `${username} logged in!`,
      username: username,
      session: req?.session?.user,
      data: validityUser,
    });
  }
};

module.exports = loginUser;