const express = require("express");
const router = express.Router();
const forumModel = require("../models/forum")

router.route("/").get(async (req,res)=>{

    const user = req.session.user

    if(user && user.length>0){
        try{
            const data = await forumModel.find({_id:req.session.user.id}).populate("by");
            res.status(200).json(data);
        }catch(err){
            console.error(err);
            res.status(500).json({Alert:err})
        }
    }else{
        try{
            const data = await forumModel.find();
            res.status(200).json(data);
        }catch(err){
            console.error(err);
            res.status(500).json({Alert:err})
        }
    }
   


}).post(async (req, res) => {
    try {
        const { question, answer, topic, rating } = req?.body;
        
        if (!question || !topic) {
            return res.status(400).json({ Alert: "NO Question/Topic!" });
        }

        const conflict = await forumModel.findOne({ question });

        if (conflict) {
            return res.status(409).json({ Alert: `${question} was Already posted before!` });
        }

        const created = await forumModel.create({ question, answer, topic, rating });
        
        if (created) {
            return res.status(201).json({ Alert: `${question} Added!` });
        } else {
            return res.status(500).json({ Alert: "Failed to create the question." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Alert: "An error occurred while processing your request." });
    }
})

router.route("/:id").put(async (req, res) => {
    const answer = req?.body.answer;
    const id = req?.params?.id;

    if (!answer || !id) {
        return res.status(400).json({ Alert: "NO Answer!" });
    }

    const exists = await forumModel.findOne({ _id: String(id) });
    if (!exists) {
        return res.status(404).json({ Alert: "ID doesn't exist!" });
    } else {
        await exists.updateOne({answer}); // Update the document
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

router.route("/upvotes/:id").put(async (req,res)=>{
    const id = req?.params?.id
    const votes = req.body.votes;

    if(!id || !votes) res.status(400).json({Alert:"No ID/Votes Sent!"})

    const verify = await forumModel.findOne({_id:String(id)})
    if(!verify){
        res.status(404).json({Alert:`${id} brings an invalid question!`})
    }else{
        await verify.updateOne({votes})
        res.status(200).json({Votes:`Upvoted!`});
    }

})


module.exports = router;