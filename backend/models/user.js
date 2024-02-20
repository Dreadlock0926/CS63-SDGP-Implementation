const mongoose = require("mongoose");
const examHistorySchema = new mongoose.Schema(
  {
    examHistory: {
      type: Object,
      quesArr: { type: Array },
      ansArr: { type: Array },
      incorrectAnsIndex: { type: Array },
      userExamID: { type: String },
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  examHistory: { type: [examHistorySchema], required: false },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
