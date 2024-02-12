const express = require("express");
const router = express.Router();


router.route("/").get((req,res)=>{
    res.status(200).json({Alert:"Testing JSON!"})
}).post((req,res)=>{
    const {answers} = req.body;
    if(!answers) return res.status(200).json({Alert:"NO answers!"});

    //rest of the logic
})

router.route("/scope").get((req,res)=>{
    const {topics} = req.body;
    if(!topics){
        res.status(200).json({Send:"Everything!"})
    }else{
        //aggregate {$match:{topics}} + length && length>0 -> res.status(200).json(data);
    }
})


module.exports=  router;