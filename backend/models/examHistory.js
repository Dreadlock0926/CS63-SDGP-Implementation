const mongoose = require("mongoose");
const examResourcesSchema = mongoose.Schema({
   examID: {
      type: String,
      default: function() {
         return Date.now();
      },
      trim: true
   },
   questionID: {
      type: Array,
      default: []
   },
});

const ExamResource = mongoose.model('ExamResource', examResourcesSchema);

module.exports = ExamResource;
