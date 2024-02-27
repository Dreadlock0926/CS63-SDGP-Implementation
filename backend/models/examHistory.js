const mongoose = require("mongoose");

const examResourcesSchema = mongoose.Schema({
   examID: {
      type: String,
      default: function() {
         return 'examID_' + Date.now().toFixed(); 
      },
      trim: true
   },
   theExam: {
      type:Array,
      default:[]
   },
   questionID:{
      type:Array,
      default:[],
   }
});

const ExamResource = mongoose.model('ExamResource', examResourcesSchema);

module.exports = ExamResource;
