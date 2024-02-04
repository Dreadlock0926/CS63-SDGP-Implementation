const express = require("express");
const router = express.Router();
const learningModel = require("../models/learningResources");
//needs to be put in a controller

router
  .route("/")
  .get(async (req, res) => {
    try {
      const resources = await learningModel.find();
      return res.status(200).json(resources);
    } catch (err) {
      console.error(err);
    }
  })
  .post(async (req, res) => {
    const { topic, title, about, subtopic } = req?.body;

    if (!topic || !title) {
      return res
        .status(400)
        .json({ Alert: "Required fields not filled! (topic and title!)" });
    }

    try {
      const existingLearningResource = await learningModel.findOne({ topic });

      if (!existingLearningResource) {
        await learningModel.create({ topic, title, about, subtopic });
        return res
          .status(201)
          .json({ Alert: "Added Learning Resource to Learn" });
      } else {
        const updatedLearningResource = await learningModel.updateOne(
          { topic },
          { $set: { title, about, subtopic } }
        );

        if (!updatedLearningResource) {
          return res.status(400).json({ Alert: "Error while updating!" });
        } else {
          return res
            .status(201)
            .json({ Alert: "Updated Learning Resource in Learn" });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ Alert: "Internal Server Error" });
    }
  });

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
