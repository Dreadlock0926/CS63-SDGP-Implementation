const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({

  questionID: { type: String, required: true, unique: true},
  questionsGrid: {type: Array, required: false },
  questionsFiguresGrid: {type: Array, required: false},
  answersGrid: {type: Array, required: false },
  questionSource: {type: String, required: false }
  
});

const questionModel = mongoose.model("questions", questionSchema);
module.exports = questionModel;
