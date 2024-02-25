const mongoose = require("mongoose");
const learningResources = mongoose.Schema({
  topic: { type: String },
  title: { type: String },
  about: { type: String },
  subtopic: {
    type: String,
  },
  url:{
    type:String,
    required:false,
    trim:true,
  },
  photo:{
    type:String,
    trim:true,
  },
  addedBy:{
    type:String,
    ref:"users"
  }
});

const learningModel = mongoose.model("resources", learningResources);
module.exports = learningModel;
