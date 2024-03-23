const express = require("express");
const router = express.Router();
const progressionModel = require("../models/user");
const examModel = require("../models/exam");
const { default: mongoose } = require("mongoose");

router.route("/patch").patch(async (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const username = req.session.user.username;
  const password = req.session.user.password;

  const {
    marks,
    testHistory,
    testnumber,
    voxalPoints,
    hoursLearned,
    ongoingCourses,
    completeCourse,
    PureMathematics,
    Statistics,
  } = req?.body;

  if (
    !marks ||
    !testHistory ||
    !testnumber ||
    !testnumber ||
    !voxalPoints ||
    !hoursLearned ||
    !ongoingCourses ||
    !completeCourse ||
    !PureMathematics ||
    !Statistics
  ) {
    return res.status(400).json({ Alert: "Please provide correct data!" });
  }
  try {
    const progressionData = await progressionModel.updateOne(
      { username: username, password: password },
      {
        $set: {
          marks,
          testHistory,
          testnumber,
          voxalPoints,
          hoursLearned,
          ongoingCourses,
          completeCourse,
          PureMathematics,
          Statistics,
        },
      },
      { new: true }
    ); //check this
    if (!progressionData) {
      return res
        .status(400)
        .json({ Alert: "It has not been stored in the database!" });
    }

    return res.status(200).send("You have successfully saved the data");
  } catch (err) {
    console.log(err);
    return res.status(401).json({ Alert: `You are encountering an ${err}` });
  }
});

router.route("/get").post(async (req, res) => {
  try {
    // if(!req.session.user) return res.sendStatus(401);
    // const username = req.session.user.username;
    // const password = req.session.user.password;

    // const userData = await progressionModel.find({_id:req?.session?.user?._id}).populate("users");
    // if(!req.session.user)return res.sendStatus(401);
    const username = req.body.username1;
    const password = req.body.password1;

    const userData = await progressionModel.findOne({ username, password });

    if (!userData) {
      return res.status(203).json({ Alert: "No resources found!" });
    }
    return res.send(userData);
  } catch (err) {
    console.error(err);
  }
});

router.route("/get/marks").post(async (req, res) => {
  const listofQuestions = [];
  const { useRef } = req.body;

  if (!useRef) {
    return res.status(400).json({ Alert: "No data 1 found!" });
  }

  try {
    // Make sure to use the `new` keyword when creating a new ObjectId instance
    const response = await examModel.find({
      userRef: new mongoose.Types.ObjectId(useRef),
      examType: "Feedback",
    });

    if (!response || response.length === 0) {
      // Checking if the response array is empty
      return res.status(400).json({ Alert: "No data 2 found!" });
    } else {
      return res.status(200).send(response);
    }
  } catch (err) {
    console.log(err);
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.route("/get/hours").post(async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    return res.status(400).json({ Alert: "No data found!" });
  }

  try {
    const user = await progressionModel.findById(_id);
    if (user) {
      const createdAt = new Date(user.createdAt);
      const updatedAt = new Date(user.updatedAt);

      // Check if the dates are valid
      if (!isNaN(createdAt.getTime()) && !isNaN(updatedAt.getTime())) {
        const diff = updatedAt - createdAt;
        const diffHours = diff / 3600000; // Convert milliseconds to hours
        const totalHours = Math.round(diffHours, 2);
        return res.json({ hours: totalHours });
      } else {
        // Handle the invalid date case
        return res.status(400).json({ Alert: "Invalid date format." });
      }
    } else {
      return res.status(404).json({ Alert: "User not found!" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ Alert: "An error occurred while processing your request." });
  }
});

module.exports = router;
