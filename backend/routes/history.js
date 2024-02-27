const express = require("express");
const router = express.Router();
const examHistory = require("../models/examHistory")

router.route("/").post(async (req,res)=>{
    const {questionID,by="guest"} = req?.body;
    if( !questionID) return res.status(400).json({Alert:"No exam data provided!"});
    const newExam = await examHistory.create({questionID,By:by});
    res.status(200).json({Alert:`Exam ${newExam.examID}`})
})

module.exports = router;