const express = require('express');
const router = express.Router();
const progressionModel = require("../models/progressionSchema");

router.route("/post").post(async (req, res) => {
  const { marks, testHistory, testnumber } = req?.body;

  if (!marks || !testHistory || !testnumber) {
    return res.status(400).json({ Alert: "Please provide correct data!" });
  }

  try {
    const progressionData = await progressionModel.create({ marks, testHistory, testnumber });

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
  try {
    const getData = await progressionModel.find();
    return res.status(200).json(getData);
  } catch (err) {
    return res.status(401).json({ Alert: `You are encountering an ${err}` });
  }
});

module.exports = router;
