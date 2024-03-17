const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.GEMINI_KEY;

router.route("/").post(async (req, res) => {
  try {
    const { search } = req?.body;

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = ` ${search} , respond to this as a maths bot!`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    if (text.length) {
      return res.status(200).json({Data:text});
    } else {
      return res.status(404).send("No results found!");
    }
  } catch (err) {
    res.json({ Alert: `Something went wrong ${err.status}` });
    console.error(err);
  }
});

module.exports = router;
