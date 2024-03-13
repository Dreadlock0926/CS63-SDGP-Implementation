const express = require("express");
const router = express.Router();

const userModel = require("../models/user");
const topicsModel = require("../models/topics");

router.post("/getModules", async (req, res) => {
  const { courses } = req.body;

  try {
    // Handle cases where courses is not an array
    if (!Array.isArray(courses)) {
      return res
        .status(400)
        .json({ message: "Invalid courses data. Must be an array." });
    }

    // Efficiently filter topics using aggregation framework:
    const topics = await topicsModel.aggregate([
      {
        $match: {
          sourceKey: { $nin: courses }, // Exclude topics with matching topicKeys
        },
      },
    ]);

    res.json(topics); // Send filtered topics as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching topics" });
  }
});

router.post("/updateCourse", async (req, res) => {
  const { userId } = req.body;
  const { courseToAdd } = req.body; // Replace 'courseToAdd' with actual data structure

  try {
    // Find the user by ID
    const user = await userModel.findByIdAndUpdate(userId, {
      $push: { courses: courseToAdd }, // Use $push to append to the array
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Course appended successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error appending course" });
  }
});

module.exports = router;
