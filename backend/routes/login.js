const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
router.route("/").post(async (req, res) => {
  const { username, password } = req?.body;

  if (!username || !password) {
    return res.status(400).json({ Alert: "Username/Password Missing!" });
  }

  const validityUser = await userModel.findOne({ username });

  if (!validityUser) {
    return res.status(400).json({ Alert: "Invalid Username" });
  } else {
    const passwordMatch = bcrypt.compareSync(password, validityUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ Alert: "Unauthorized" });
    } else {
      req.session.user = { username, maxAge: 60000 , _id:validityUser._id};
      return res.status(200).json({
        Alert: `${username} logged in!`,
        username: req.session.user.username,
      });
    }
  }
});

router.route("/status").post(async (req, res) => {
  const user = req?.session?.user;

  if (!user && !user.username) {
    return res.status(401).json({ Alert: "Unauthorized!" });
  } else {
    return res
      .status(200)
      .json({ username: user.username, password: user.password });
  }
});

router.route("/logout").post(async (req, res) => {
  const user = req.session.user;
  try {
    if (!user) {
      return res.status(403).json({ Alert: "No user logged in!" });
    } else {
      await req.session.user.destroy((err) => {
        if (err) {
          throw err;
        } else {
          return res.status(200).json({ Alert: "User Logged Out!" });
        }
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Alert: "No user was logged in!" });
  }
});
module.exports = router;
