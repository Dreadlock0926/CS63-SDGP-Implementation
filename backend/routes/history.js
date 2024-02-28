const express = require("express");
const router = express.Router();
const examHistory = require("../models/examHistory")

router.route("/").post(async (req,res)=>{
    const questionID = req?.body?.questionID;
    if(!questionID) return res.status(400).json({Alert:"No exam data provided!"});
    console.log(questionID);
    try{
    const newExam = await examHistory.create({questionID});
    return res.status(200).json({Alert:`Exam ${newExam.examID}`})
    }catch(err){
        console.error(err);
    }
})



module.exports = router;