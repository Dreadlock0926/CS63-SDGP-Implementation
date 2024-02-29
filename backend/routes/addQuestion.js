const express = require("express");
const router = express.Router();
const questionModel = require("../models/question");
const topicsModel = require("../models/topics");

router.route("/").post(async (req, res) => {
  const {
    questionID,
    questionTopic,
    questionsGrid,
    questionsFiguresGrid,
    answersTypeGrid,
    answersGrid,
    marksGrid,
    questionSource,
  } = req?.body;

  if (!questionID) {
    return res.status(400).json({ Alert: "Provide a question ID!" });
  }

  const doesQuestionExist = await questionModel.findOne({ questionID });

  if (!doesQuestionExist) {
    await questionModel.create({
      questionID,
      questionTopic,
      questionsGrid,
      questionsFiguresGrid,
      answersTypeGrid,
      answersGrid,
      marksGrid,
      questionSource,
    });

    return res.status(200).json({ Alert: `${questionID} Registered!` });
  } else {
    return res.status(409).json({ Alert: ` ${questionID} Already Exists!` });
  }
});

router.route("/getQuestionInfo").post(async (req, res) => {
  const { source } = req?.body;

  if (source !== "Default") {
    if (!source)
      return res.status(400).json({ Alert: "The source is missing!" });
    const sourceData = await topicsModel.findOne({ source });

    if (!sourceData) {
      res
        .status(400)
        .json({ Alert: "The source data is not matching records." });
    } else {
      res.status(200).json(sourceData);
    }
  }
});

router.route("/getModules").get(async (req, res) => {
  try {
    const result = await topicsModel.find({}, "source");
    const sourcesArray = result.map((topic) => topic.source);
    res.json(sourcesArray);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.route("/getModulesForPastPaper").get(async (req, res) => {
  try {
    // Project only the necessary fields
    const modules = await topicsModel.find({}, { sourceKey: 1, source: 1 });

    // Prepare a set to store unique sources (represented by sourceKey)
    const uniqueSources = new Set();

    // Iterate through modules and add unique sourceKeys to the set
    modules.forEach((module) => {
      uniqueSources.add(module.sourceKey);
    });

    // Extract unique sourceKeys and corresponding sources from the set
    const formattedModules = Array.from(uniqueSources)
      .map((sourceKey) => {
        const matchingModule = modules.find(
          (module) => module.sourceKey === sourceKey
        );
        if (!matchingModule) {
          console.warn(
            `Skipping sourceKey '${sourceKey}' as no matching source found.`
          );
          return null; // Skip missing sourceKeys
        }
        return {
          sourceKey,
          source: matchingModule.source,
        };
      })
      .filter((module) => module); // Remove null entries (if any)

    // Handle potential errors and edge cases
    if (!formattedModules.length) {
      return res.status(404).json({ message: "No modules found." });
    }

    // Send successful response with formatted modules
    res.status(200).json(formattedModules);
  } catch (error) {
    console.error("Error retrieving modules:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
