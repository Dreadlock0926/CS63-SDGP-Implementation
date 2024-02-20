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
    marks: {
      type: Number,
      default: 0,
    },
    nerdPoints:{
      type:Number,
      min:0,
      default:0
    },
    by: {
      type: String,
      ref: "users",
    },
  
},{timestamps:true});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
