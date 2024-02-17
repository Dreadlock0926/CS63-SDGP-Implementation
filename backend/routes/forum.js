const express = require("express");
const router = express.Router();
const forumModel = require("../models/forum")

router.route("/").get(async (req,res)=>{
    try{
        const data = await forumModel.find();
        res.status(200).json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({Alert:err})
    }


}).post(async (req,res)=>{
    const{question, answer ,topic ,rating }  = req?.body;
    if(!question || !topic) res.status(400).json({Alert:"NO Question/Topic!"})

    const conflict = await forumModel.findOne({question})
    if(!conflict){
        const created = await forumModel.create({question,answer,topic,rating});
        if(created){
            res.status(201).json({Alert:`${question} Added!`})
        }else{
            res.status(409).json({Alert:`${question} was Already posted before!`})
        }
    }
})

router.route("/:id").put(async (req, res) => {
    const answer = req?.body.answer;
    const id = req.params.id;

    if (!answer || !id) {
        return res.status(400).json({ Alert: "NO Answer!" });
    }

    const exists = await forumModel.findOne({ _id: String(id) });
    if (!exists) {
        return res.status(404).json({ Alert: "ID doesn't exist!" });
    } else {
        await forumModel.updateOne({ _id: String(id) }, { answer }); // Update the document
        return res.status(200).json({ Alert: `Updated ${id}` });
    }
}).delete(async(req,res)=>{
    const id = req.params.id
    if(!id) res.status(400).json({Alert:"NO ID Provided!"})

    const exists = await forumModel.findOne({_id:String(id)});
    if(!exists){
        res.status(404).json({Alert:"ID doesn't exist!"})
    } else{
        await exists.deleteOne({_id:String(id)});
        res.status(200).json({Alert:`Deleted ${id}`})
    }




})


module.exports = router;