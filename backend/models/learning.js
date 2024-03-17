const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },

  lessonTitles: {
    type: [String],
    default: [],
  },

  lessonBody: {
    type: [String],
    default: [],
  },
});

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },

  courseDescription: {
    type: String,
    default: "",
  },

  topics: {
    type: [String],
    default: [],
  },

  topicKeys: {
    type: [String],
    default: [],
  },

  noOfLessonsInTopic: {
    type: [Number],
    default: [],
  },

  lessons: {
    type: [lessonSchema],
    default: [],
  },
});
