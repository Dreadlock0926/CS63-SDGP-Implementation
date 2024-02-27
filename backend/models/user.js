const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  examHistory: {
    type: Object,
    quesArr: { type: Array },
    ansArr: { type: Array },
    incorrectAnsIndex: { type: Array },
    userExamID: { type: String },
  },
  incorrectSections:{
    type:Array,
    default:[]
  }
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
