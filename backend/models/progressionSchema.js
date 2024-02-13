const mongoose = require('mongoose');
const progressionSchema = new mongoose.Schema(
  {
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
  by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
  }
},
  { 
    timestamps: true 
  }
);

const progressionModel = mongoose.model("progression",progressionSchema);
module.exports = progressionModel;