const express = require("express");
const router = express.Router();
const examModel= require("../models/exam")


router.route("/").get(async (req,res)=>{
  const data = await examModel.find();

  // Shuffle the data array

  res.status(200).json(shuffledData);
}).post((req,res)=>{
    const {answers} = req.body;
    if(!answers) return res.status(200).json({Alert:"NO answers!"});

    //rest of the logic
})

router.route("/scope").get(async (req,res)=>{
    const {topics} = req?.body;
    if(!topics){
        const data = await examModel.find();

        const shuffledData = shuffleArray(data);
  
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }


        res.status(200).json(shuffledData)


    }else{
      const matches = await examModel.aggregate([
        { $match: { questionTopic:topics} } //works
    ]);
      if(matches && matches.length>0){

        const shuffledData = shuffleArray(matches);
  
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }


        res.status(200).json(shuffledData)
      }else{
        res.status(203).json({Alert:"NO Questions matching the topics!"})
      }
    }
})


module.exports=  router;