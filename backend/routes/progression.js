const express = require('express');
const router = express.Router();
const progressionModel = require("../models/user");

router.route("/patch").patch(async (req, res) => {
  if(!req.session.user) return res.sendStatus(401);
  const username = req.session.user.username;
  const password = req.session.user.password;

  const { marks, testHistory, testnumber,voxalPoints,hoursLearned,ongoingCourses,completeCourse,PureMathematics,Statistics } = req?.body;

  if (!marks || !testHistory || !testnumber||!testnumber||!voxalPoints||!hoursLearned||!ongoingCourses||!completeCourse||!PureMathematics||!Statistics) {
    return res.status(400).json({ Alert: "Please provide correct data!" });
  }
  console.log(req.body);
  try {
    const progressionData = (await progressionModel.updateOne({username:username,password:password},{$set:{
      marks, 
      testHistory, 
      testnumber,
      voxalPoints,
      hoursLearned,
      ongoingCourses,
      completeCourse,
      PureMathematics,
      Statistics,

    }},{ new: true })); //check this
    console.log(progressionData);

    if (!progressionData) {
      return res.status(400).json({ Alert: "It has not been stored in the database!" });
    }

    return res.status(200).send("You have successfully saved the data");
  } catch (err) {
    console.log(err);
    return res.status(401).json({ Alert: `You are encountering an ${err}` });
  }
});

router.route("/get").post(async (req, res) => {

  try{
    // if(!req.session.user) return res.sendStatus(401);
    // const username = req.session.user.username;
    // const password = req.session.user.password;
    
    // const userData = await progressionModel.find({_id:req?.session?.user?._id}).populate("users");
    // if(!req.session.user)return res.sendStatus(401);
    const username = req.body.username1;
    const password = req.body.password1;
  
    console.log("The user name is "+username);
    console.log("The password is"+password);

    const userData = await progressionModel.findOne({username,password});
    
      if(userData){
        return res.send(userData);
      }else{
        return res.status(203).json({Alert:"No resources found!"})
      }
  }catch(err){
    console.error(err);
  }

});

module.exports = router;