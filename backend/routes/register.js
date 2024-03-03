const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");

router.route("/").post(async (req, res) => {
  if(!req.session.user){ //only someone who hasn't logged in can create an account
    const { username, password } = req?.body;
    if (!username || !password)
      return res.status(400).json({ Alert: "Username/Password Missing!" });
  
    const validityUser = await userModel.findOne({ username });
  
    if (!validityUser) {
      const passwordAuth = bcrypt.hashSync(password, Math.random());
  
      await userModel.create({ username, password: passwordAuth });
  
      return res.status(201).json({ Alert: `${username} Registered!` });
    } else {
      return res.status(409).json({ Alert: ` ${username} Already Exists!` });
    }
  }else{
    res.status(409).json({Alert:"Please Logout to Register New Account!"})
  }

});

module.exports = router;
