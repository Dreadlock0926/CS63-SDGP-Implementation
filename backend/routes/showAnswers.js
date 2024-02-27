const express = require("express");
const router = express.Router();
const examHistory = require("../models/examHistory");

router.route("/").post(async (req, res) => {
const { examID } = req.body

    if (!examID) return res.status(400).json({Alert:"No exam ID found!"})
});

module.exports = router;