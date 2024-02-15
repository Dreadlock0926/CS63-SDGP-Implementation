const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
router.route("/").post(async (req, res) => {
  if(!req?.session?.user){
    const { username, password } = req?.body;

    if (!username || !password) {
      return res.status(400).json({ Alert: "Username/Password Missing!" });
    }
  
    const validityUser = await userModel.findOne({ username });
  
    if (!validityUser) {
      return res.status(404).json({ Alert: "Invalid Username" });
    } else {
      const passwordMatch = bcrypt.compareSync(password, validityUser.password);
      if (!passwordMatch) {
        return res.status(401).json({ Alert: "Incorrect Password!" });
      } else {
        req.session.user = { username,_id:validityUser._id, maxAge: 60000 };  //there's an issue here
        return res
          .status(200)
          .json({
            Alert: `${username} logged in! `,
            Session:req?.session?.user
          });
      }
    }
  }else{
    res.status(409).json({Alert:"User Already Logged in!"})
  }

});
module.exports = router;
