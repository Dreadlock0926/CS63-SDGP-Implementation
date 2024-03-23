const questionModel = require("../models/question");

const getQuestionId = async (req, res) => {

  const { questionID } = req?.body;

    if (!questionID) return res.status(400).json({Alert: "The question ID is missing!"});
    const questionData = await questionModel.findOne({questionID});
  
    if (!questionData) {
  
      res.status(400).json({Alert: "The question data is not matching records."});
  
    } else {
  
      res.status(200).json(questionData);
  
    }

}

const getAllQuestions = async (req, res) => {

  let { moduleID } = req?.body;

  if (!moduleID) return res.status(400).json({Alert: "The module ID is missing!"});
  let regExp = new RegExp("^" + moduleID)
  const moduleData = await questionModel.find({questionID: regExp}, {questionID:1, _id:0});

  if (!moduleData) {
    res.status(400).json({Alert: "The question data is not matching records."});
  } else {
    res.status(200).json(moduleData);
  }

}


module.exports = {
  getQuestionId,
  
};