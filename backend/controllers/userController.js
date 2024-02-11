const forumModel = require("../models/forum");

// async function GetUsers(req, res) {
//   const { topic } = req?.body;
//   try {
//     if (!topic) {
//       const forumData = await forumModel.find();
//        res.status(200).json(forumData);
//     }
//     const topicRelated = await forumModel.find({$match:{ topic} });
//      res.status(200).json(topicRelated);
//   } catch (err) {
//     console.error(err);
//      res.status(500).json({ Alert: err.message });
//   }
// }

async function GetUsers(req,res){
    try{
        const forumData = await forumModel.find();
        if(!forumData) {
             res.status(200).json({Alert:"No forum data posted yet!"})
        }else{
           res.status(200).json(forumData)
        }
    }catch(err){
        console.error(err);
        res.status(500).json({Alert:"Server issue!"})
    }
}

async function CreateQuestions(req, res) {
  const { question, answer, topic,rating } = req?.body;

  if (!question || !topic)
     res.status(400).json({ Alert: "No questions or topic provided" });
  try{
    await forumModel.create({
      question,
      answer,
      topic,
      rating
    });
  
     res.status(201).json({ Alert: "Question Added" });
  }catch(err){
    console.error(err);
     res.status(500).json({Alert:err})
  }


}

async function AnsweringQuestions(req,res){ //depending on ID we update answer!
    const {answer} = req?.body;
    const id = req?.params?.id;
if(!answer || !id)  res.status(400).json({Alert:"NO Answer/ID!"})

    const valid = await forumModel.findOne({_id:String(id)})
    if(!valid)  res.status(401).json({Alert:"Invalid Question!"})

    const updated = await valid.updateOne({answer})
    updated ? res.status(200).json({Alert:"Answer Posted!"}) : res.status(400).json({Alert:"Error while posting answer!"})
}

const Upvote = async (req,res)=>{
  const answer = req?.body.answer;
  const id = req?.params.id;
  if(!answer || !id)  res.status(400).json({Alert:"Answer OR ID Missing!"})


  const validID = await forumModel.findOne({_id:String(id)})
  if(!validID){
     res.status(401).json({Alert:"Invalid ID"})
  }else{
      const updateState = await forumModel.updateOne(validID.answer)
      if(!updateState){
         res.status(400).json({Alert:"Couldn't update!"})
      }else{
         res.status(200).json({Alert:"Updated!"})
      }
  }
}

module.exports = { GetUsers, CreateQuestions, AnsweringQuestions,Upvote };
