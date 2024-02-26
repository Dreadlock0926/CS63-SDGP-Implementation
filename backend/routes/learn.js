const express = require("express");
const router = express.Router();
const learningModel = require("../models/learningResources");
//needs to be put in a controller
//logic here must be changed
//we need multer if photo uploads are needed

router
  .route("/")
  .post(async (req, res) => {
    const { topic, title, about, subtopic,url } = req?.body;
    const {file:image} = req;  //if uploading images is a must

    //we could implement images (cloudinary possibly) logic here if y'all want!

    if (!topic || !title) {
      return res
        .status(400)
        .json({ Alert: "Required fields not filled! (topic and title!)" });
    }

    try {
    const titleExists = await learningModel.findOne({title});
    if(!titleExists){
      await learningModel.create({ topic, title, about,photo:image, subtopic , url}); 
      return res
        .status(201)
        .json({ Alert: "Added Learning Resource to Learn" });
    }else{
      res.status(409).json({Alert:`${title} Already Exists!`})
    }
    
    } catch (error) {
      console.error(error);
      return res.status(500).json({ Alert: "Internal Server Error" });
    }
  });

  router.route("/topic").post(async (req,res)=>{
    const topic = req?.body?.topic;
    if(!topic){
      const everything = await learningModel.find();
      if(everything && everything.length>0){
              res.status(200).json(everything)
      }else{
        res.status(203).json({Alert:"No Resources found in general"})
      }

    }else if(topic==="Pure Mathematics I"){
      const pureMath = await learningModel.find({topic:"Pure Mathematics I"});
      if(pureMath && pureMath.length > 0 ){
        res.status(200).json(pureMath)
      }else{
        res.status(203).json({Alert:"No Pure Mathematics Resources found!"})
      }
    }else if(topic==="Probability And Statistics"){
      const Statistics = await learningModel.find({topic:"Probability And Statistics"});
      if(Statistics && Statistics.length > 0 ){
        res.status(200).json(Statistics)
      }else{
        res.status(203).json({Alert:"No Statstics Resources found!"})
      }
    }
  })

  router.route("/topic/id").post(async (req,res)=>{
    const id = req?.params?.id;
    const topic = req?.body?.topic;
    if(!topic || !id){
      res.status(400).json({Alert:"Topic and ID is required!"})

    }else if(topic==="Pure Mathematics I"){
      const pureMath = await learningModel.find({topic:"Pure Mathematics I"});
      if(pureMath && pureMath.length > 0 ){
        res.status(200).json(pureMath)
      }else{
        res.status(203).json({Alert:"No Pure Mathematics Resources found!"})
      }
    }else if(topic==="Probability And Statistics"){
      const Statistics = await learningModel.find({topic:"Probability And Statistics"});
      if(Statistics && Statistics.length > 0 ){
        res.status(200).json(Statistics)
      }else{
        res.status(203).json({Alert:"No Statstics Resources found!"})
      }
    }
  })



router
  .route("/:id")
  .put(async (req, res) => {
    const id = req?.params.id;
    const { title, about, subtopic } = req?.body;

    if (!id) return res.status(400).json({ Alert: "ID required to update" });

    const topicExists = await learningModel.findOne({ _id: String(id) });
    if (!topicExists) {
      return res
        .status(400)
        .json({ Alert: "Invalid ID , therefore cannot update!" });
    } else {
      const newUpdate = await learningModel.updateOne({
        topicExists: title || about || subtopic,
      });
      if (!newUpdate) {
        return res.status(400).json({ Alert: "Error while updating!" });
      } else {
        return res.status(200).json({ Alert: "Updated Resource!" });
      }
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ Alert: "No ID Provided!" });

    const itemExists = await learningModel.findOne({ _id: String(id) });
    if (!itemExists) {
      return res.status(400).json({ Alert: "Invalid ID" });
    } else {
      const deleteState = await itemExists.deleteOne();
      if (!deleteState) {
        return res.status(400).json({ Alert: "Couldn't delete resource!" });
      } else {
        return res.status(200).json({ Alert: "Resource Deleted!" });
      }
    }
  });

module.exports = router;
