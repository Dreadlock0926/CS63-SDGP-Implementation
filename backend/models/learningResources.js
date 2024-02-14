const mongoose = require("mongoose");
const learningResources = mongoose.Schema({
  topic: { type: String, required: true },
  title: { type: String, required: true },
  about: { type: String },
  subtopic: {
    type: String,
    unique: true,
  },
  addedBy:{
    type:String,
    ref:"users"
  }
});

const learningModel = mongoose.model("resources", learningResources);
module.exports = learningModel;
