const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport-local");

// passport.use(
//   new LocalStrategy(function (username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       if (!user.verifyPassword(password)) {
//         return done(null, false);
//       }
//       return done(null, user);
//     });
//   })
// );

router.route("/").post(
  // passport.authenticate("local", { failureRedirect: "/" }),
  async (req, res) => {
    console.log(req.sessionID);
    if (!req?.session?.user) {
      const { username, password } = req?.body;

      if (!username || !password) {
        return res.status(400).json({ Alert: "Username/Password Missing!" });
      }

      const validityUser = await userModel.findOne({ username });

      if (
        !validityUser ||
        !bcrypt.compareSync(password, validityUser.password)
      ) {
        return res.status(404).json({ Alert: "Invalid Username" });
      } else {
        // const passwordMatch = bcrypt.compareSync(password, validityUser.password);
        req.session.authenticated = true;
        req.session.user = { username, _id: validityUser._id, maxAge: 60000 }; //there's an issue here, temporarily storing session!
        return res.status(200).json({
          Alert: `${username} logged in! `,
          Session: req?.session?.user,
        });
      }
    } else {
      res.status(409).json({ Alert: "User Already Logged in!" });
    }
  }
);
module.exports = router;
