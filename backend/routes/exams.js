const express = require("express");
const router = express.Router();
const examModel= require("../models/exam")


router.route("/").get(async (req,res)=>{
    const data = await examModel.find();
    res.status(200).json(data)
}).post((req,res)=>{
    const {answers} = req.body;
    if(!answers) return res.status(200).json({Alert:"NO answers!"});

    //rest of the logic
})

router.route("/scope").get(async (req,res)=>{
    const {topics} = req.body;
    if(!topics){
        const data = await examModel.find();
        res.status(200).json(data)
    }else{
      const matches = await examModel.aggregate({$match:{topics}})
      if(matches && matches.length>0){
        res.status(200).json(matches)
      }else{
        res.status(203).json({Alert:"NO Questions matching the topics!"})
      }
    }
})


module.exports=  router;