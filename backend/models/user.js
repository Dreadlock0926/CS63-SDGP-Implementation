const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  
  username: {
    type: String,
    required: true,
    unique:true
  },
  password: { type: String, required: true },

  marks: {
    type: Number,
    default: 0,
  },
  
  testHistory: { 
    type: Object, default: {
    rank:{
      type:Number,
      default: 0,
    },
    done:{
      type: Array,
      default:[],
    }
  }
  
},
testnumber:{
  type:Number,
  default:0,
},

voxalPoints :{
  type:Number,
  default:0
},
hoursLearned:{
  type:Number,
  defalut:0
},
ongoingCourses:{
  type:Number,
  default:0
},
completeCourse:{
  type:Number,
  default:0

},
PureMathematics:{
  type:Object,default:{
    learnedProgress:Number,
    lesson:Number,
    default:0
  }
},
Statistics:{
    type:Object,default:{
    learnedProgress:Number,
    lesson:Number,
    default:0
  }
}

},
{ 
  timestamps: true 
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
