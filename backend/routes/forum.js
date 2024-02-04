const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")


router.route("/").get(userController.GetUsers).post(userController.CreateQuestions)

router.route("/answer").post(userController.AnsweringQuestions)

module.exports = router;