const mongoose = require("mongoose");

const learningResourcesSchema = mongoose.Schema({
  topic: { type: String },
  title: { type: [String] },
  body:{type:[String]},
  about: { type: String },
  subtopic: { type: String },
  url: { type: [String], default: "", trim: true },
  lesson:{
    type:[Array]
  },
  photo: { type: String, trim: true },
  addedBy: { type: String, ref: "users" },
  topicKey: { type: String, ref: "topics" }, // Reference to the topic key in topicsModel
});

const learningModel = mongoose.model("resources", learningResourcesSchema);

module.exports = learningModel;
