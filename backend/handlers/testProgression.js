const progressionModel = require("../models/user");
const examModel = require("../models/exam");
const { default: mongoose } = require('mongoose');

const getMarks = async (req, res) => {
  const listofQuestions = [];
  const { useRef } = req.body;
  console.log(useRef);
 
  if(!useRef){
    return res.status(400).json({ Alert: "No data 1 found!" });
  }
  
  try {
    // Make sure to use the `new` keyword when creating a new ObjectId instance
    const response = await examModel.find({ userRef: new mongoose.Types.ObjectId(useRef),examType: "Feedback" });
  
   
    console.log(response);
   

    if (!response || response.length === 0) { // Checking if the response array is empty
      return res.status(400).json({ Alert: "No data 2 found!" });
    } else {
      return res.status(200).send(response);
    }
  } catch (err) { 
    console.log(err);
    console.log(err);
    return res.status(500).json({ error: err.message });

  }
};
const  topicalMarks = async(req,res)=>{
  const {useRef} = req.body;
  if(!useRef){
    return res.status(400).json({ Alert: "No data 1 found!" });
  }
  
  try{
    const response = await examModel.find({ userRef: new mongoose.Types.ObjectId(useRef),examType: "Topical" });
    if (!response || response.length === 0) { // Checking if the response array is empty
        return res.status(400).json({ Alert: "No data 2 found!" });
    } else {
        return res.status(200).send(response);
    }

  }catch(err){
    console.log(err);
  }


}

const totalhours = async (req, res) => {
  const { _id } = req.body;
  
  if (!_id) {
    return res.status(400).json({ Alert: "No data found!" });
  }
  
  try {
    const user = await progressionModel.findById(_id);
    if (user) {
      const createdAt = new Date(user.createdAt);
      const updatedAt = new Date(user.updatedAt);
      
      // Check if the dates are valid
      if (!isNaN(createdAt.getTime()) && !isNaN(updatedAt.getTime())) {
        const diff = updatedAt - createdAt;
        const diffHours = diff / 3600000; // Convert milliseconds to hours
        const totalHours = Math.round(diffHours,2);
        console.log(totalHours);
        return res.json({ hours: totalHours  });
      } else {
        // Handle the invalid date case
        return res.status(400).json({ Alert: "Invalid date format." });
      }
    } else {
      return res.status(404).json({ Alert: "User not found!" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Alert: "An error occurred while processing your request." });
  }

}


module.exports = {
  getMarks,
  topicalMarks,
  totalhours
};
