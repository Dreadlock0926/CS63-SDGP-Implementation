const forumModel = require("../models/forum");

// async function GetUsers(req, res) {
//   const { topic } = req?.body;
//   try {
//     if (!topic) {
//       const forumData = await forumModel.find();
//       return res.status(200).json(forumData);
//     }
//     const topicRelated = await forumModel.find({ topic });
//     return res.status(200).json(topicRelated);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ Alert: err.message });
//   }
// }

async function GetUsers(req,res){
    try{
        const forumData = await forumModel.find();
        // if(!forumData) {
        //     return res.status(200).json({Alert:"No forum data posted yet!"})
        // }

        res.status(200).json(forumData)
 
    }catch(err){
        console.error(err);
        res.status(500).json({Alert:"Server issue!"})
    }
}

async function CreateQuestions(req, res) {
  const { question, answer, topic,rating } = req?.body;

  if (!question || !topic)
    return res.status(400).json({ Alert: "No questions or topic provided" });
  try{
    await forumModel.create({
      question,
      answer,
      topic,
      rating
    });
  
    return res.status(201).json({ Alert: "Question Added" });
  }catch(err){
    console.error(err);
    return res.status(500).json({Alert:err})
  }


}

async function AnsweringQuestions(req,res){ //depending on ID we update answer!
    const {answer} = req?.body;
    const id = req?.params?.id;
if(!answer || !id) return res.status(400).json({Alert:"NO Answer/ID!"})

    const valid = await forumModel.findOne({_id:String(id)})
    if(!valid) return res.status(401).json({Alert:"Invalid Question!"})

    const updated = await valid.updateOne({answer})
    updated ? res.status(200).json({Alert:"Answer Posted!"}) : res.status(400).json({Alert:"Error while posting answer!"})
}

module.exports = { GetUsers, CreateQuestions, AnsweringQuestions };
