const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({

  questionID: { type: String, required: true, unique: true},
  questionText: { type: String, required: true },
  questionFigure: { type: String, required: true },
  answerText: {type: String, required: true },
  
});

const questionModel = mongoose.model("questions", questionSchema);
module.exports = questionModel;
