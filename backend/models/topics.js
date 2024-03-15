const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  lessonTitle: { type: String, required: true },
  lessonBody: { type: String, required: true },
});

const topicLessonSchema = new mongoose.Schema({
  topicKey: { type: String, required: true },
  lessons: { type: [lessonSchema], required: true },
});

const topicsSchema = new mongoose.Schema({
  source: { type: String, required: true },
  sourceKey: { type: String, required: true, unique: true },
  topics: { type: Array, required: true },
  topicKeys: { type: Array, required: false },
  topicLesson: { type: [topicLessonSchema], default: [] },
});

const topicsModel = mongoose.model("topics", topicsSchema);
module.exports = topicsModel;
