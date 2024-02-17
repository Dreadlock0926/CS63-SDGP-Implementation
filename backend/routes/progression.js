const express = require('express');
const router = express.Router();
const progressionModel = require("../models/progressionSchema");

router.route("/post").post(async (req, res) => {
  const { marks, testHistory, testnumber,voxalPoints,hoursLearned,ongoingCourses,completeCourse,PureMathematics,Statistics } = req?.body;

  if (!marks || !testHistory || !testnumber||!testnumber||!voxalPoints||!hoursLearned||!ongoingCourses||!completeCourse||!PureMathematics||!Statistics) {
    return res.status(400).json({ Alert: "Please provide correct data!" });

  }
  console.log(req.body);

  try {
    const progressionData = (await progressionModel.create({ 
      marks, 
      testHistory, 
      testnumber,
      voxalPoints,
      hoursLearned,
      ongoingCourses,
      completeCourse,
      PureMathematics,
      Statistics,

    })); //check this

    if (!progressionData) {
      return res.status(400).json({ Alert: "It has not been stored in the database!" });
    }

    return res.status(200).send("You have successfully saved the data");
  } catch (err) {
    console.log(err);
    return res.status(401).json({ Alert: `You are encountering an ${err}` });
  }
});

router.route("/get").get(async (req, res) => {

  try{
    // const userData = await progressionModel.find({_id:req?.session?.user?._id}).populate("users");
    const userData = await progressionModel.find();
    console.log(JSON.stringify(req.session.user)); //the session is not being created
      if(userData&& userData.length>0){
        return res.status(200).json(userData);
      }else{
        return res.status(203).json({Alert:"No resources found!"})
      }
  }catch(err){
    console.error(err);
  }

});

module.exports = router;
