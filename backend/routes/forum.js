const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")


router.route("/").get(userController.GetUsers).post(userController.CreateQuestions)

router.route("/upvotes/:id").put(userController.Upvote)


router.route("/:id").put(userController.AnsweringQuestions)

module.exports = router;