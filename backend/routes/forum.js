const express = require("express");
const router = express.Router();
const forumModel = require("../models/forum");
const userModel  =require("../models/user");

router.route("/").get(async (req,res)=>{

    const user = req?.session?.user
    const id = req.body.id;

    if(user){
            try{
                const data = await forumModel.findById(id).sort({rating:-1});
                res.status(200).json(data);
            }catch(err){
                console.error(err);
                res.status(500).json({Alert:err})
            }  
    }else{
        try{
            const data = await forumModel.find().sort({rating:-1});
            res.status(200).json(data);
        }catch(err){
            console.error(err);
            res.status(500).json({Alert:err})
        }
    }
   


}).post(async (req, res) => {
    try {
        const { question, description , answer, topic, rating,by="guest"} = req?.body;
        
        if (!question || !topic) {
            return res.status(400).json({ Alert: "NO Question/Topic!" });
        }

        const conflict = await forumModel.findOne({ question });

        if (conflict) {
            return res.status(409).json({ Alert: `${question} was Already posted before!` });
        }

        const created = await forumModel.create({ question, description, answer, topic, rating ,by});
        
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

router.route("/:id")
    .put(async (req, res) => {
        const { answer } = req.body;
        const { id } = req.params;

        if (!answer || !id) {
            return res.status(400).json({ Alert: "No Answer or ID Provided!" });
        }

        try {
            const exists = await forumModel.findById(id);
            
            if (!exists) {
                return res.status(404).json({ Alert: "Invalid ID" });
            }

            exists.answer.push(answer);
            await exists.save(); // Save the changes to the document

            return res.status(200).json({ Alert: `Updated ${id}` });
        } catch (error) {
            console.error("Error updating answer:", error);
            return res.status(500).json({ Alert: "Internal Server Error" });
        }
    })
    .delete(async(req, res) => {
        const id = req?.params?.id;
        if (!id) {
            return res.status(400).json({ Alert: "No ID Provided!" });
        }

        try {
            const exists = await forumModel.findById(id);
            
            if (!exists) {
                return res.status(404).json({ Alert: "Invalid ID" });
            }

            await exists.deleteOne();
            return res.status(200).json({ Alert: `Deleted ${id}` });
        } catch (error) {
            console.error("Error deleting document:", error);
            return res.status(500).json({ Alert: "Internal Server Error" });
        }
    });



router.route("/upvotes/:id").put(async (req, res) => {
    const id = req?.params?.id;
    if (!id) {
        return res.status(400).json({ Alert: "No ID" });
    }
    try {
        const verify = await forumModel.findByIdAndUpdate(id, { $inc: { rating: 1 } }, { new: true });
        const nerdPointsUpdate = await userModel.findByIdAndUpdate({_id:req.session.user.id},{$inc:{nerdPoints:1}})
        if(!nerdPointsUpdate){
            res.status(400).json({Alert:"Error while updating nerd points , perhaps user not logged in?"})
        }else{
            res.status(200).json({Alert:`Nerd Points Updated For The User ${nerdPointsUpdate}!`})
        }
        if (!verify) {
            return res.status(404).json({ Alert: `${id} brings an invalid question!` });
        }
        res.status(200).json({ Votes: `Upvotes updated to ${verify.rating}! Data ${JSON.stringify(verify)}` });
    } catch (error) {
        res.status(500).json({ Alert: "Internal Server Error" });
    }
});

router.route("/downvotes/:id").put(async (req, res) => {
    const id = req?.params?.id;
    if (!id) {
        return res.status(400).json({ Alert: "No ID" });
    }
    try {
        const verify = await forumModel.findByIdAndUpdate(id, { $inc: { rating: -1 } }, { new: true });
        const nerdPointsUpdate = await userModel.findByIdAndUpdate({_id:req.session.user.id},{$inc:{nerdPoints:1}})
        if(!nerdPointsUpdate){
            res.status(400).json({Alert:"Error while updating nerd points , perhaps user not logged in?"})
        }else{
            res.status(200).json({Alert:`Nerd Points Updated For The User ${nerdPointsUpdate}!`})
        }
        if (!verify) {
            return res.status(404).json({ Alert: `${id} brings an invalid question!` });
        }
        res.status(200).json({ Votes: `Upvotes updated to ${verify.rating}! Data ${JSON.stringify(verify)}` });
    } catch (error) {
        res.status(500).json({ Alert: "Internal Server Error" });
    }
});

module.exports = router;