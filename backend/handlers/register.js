// Instead of using 'export const', we use 'module.exports' for compatibility with CommonJS.


import {expect, jest, test} from '@jest/globals';

const registerUser = async (req, res) => {
  const { username, password } = req?.body;
  console.log(req?.body);
  if (!username || !password)
    return res.status(400).json({ Alert: "Username/Password Missing!" });

  const validityUser = await userModel.findOne({ username });

  if (!validityUser) {
    // const passwordAuth = bcrypt.hashSync(password, 10);

    const courses = [
      "p1",
      "s1"
    ];

    await userModel.create({
      username,
      password,
      courses:courses // Assuming you have a hashed password
    });

    return res.status(201).json({ Alert: `${username} Registered!` });
  } else {
    return res.status(409).json({ Alert: ` ${username} Already Exists!` });
  }
};

// Export the registerUser function using module.exports
module.exports = { registerUser };
