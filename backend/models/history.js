const mongoose = require("mongoose");
const historySchema = new mongoose.Schema({
   questionID:{
    type:Array,default:[]
   },
    examID:{
        type:String,
        default:`${Date.now()}`
    }
})

const historyModel  = mongoose.model("histories",historySchema);
module.exports = historyModel;