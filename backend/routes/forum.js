const express = require("express");
const router = express.Router();
const forumModel = require("../models/forum");
const userModel = require("../models/user");

router.route("/").post(async (req, res) => {
  const { searchParams } = req.body;

  try {
    let forums;
    if (searchParams && searchParams.trim() !== "") {
      forums = await forumModel.find({ topic: searchParams });
    } else {
      forums = await forumModel.find(); // Get all forums if no search params
    }

    res.status(200).json(forums);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching forums" });
  }
});

router.route("/addQuestion").post(async (req, res) => {
  try {
    const { question, description, topic, by = "guest" } = req?.body;

    if (!question || !topic) {
      return res.status(400).json({ Alert: "NO Question/Topic!" });
    }

    const conflict = await forumModel.findOne({ question });

    if (conflict) {
      return res
        .status(409)
        .json({ Alert: `${question} was Already posted before!` });
    }

    const created = await forumModel.create({
      question,
      description,
      topic,
      by,
    });

    if (created) {
      return res.status(201).json({ Alert: `${question} Added!` });
    } else {
      return res.status(500).json({ Alert: "Failed to create the question." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ Alert: "An error occurred while processing your request." });
  }
});

router.route("/addAnswerToQuestion").post(async (req, res) => {
  const { questionId, answer, answeredBy = "guest" } = req.body;

  if (!questionId || !answer) {
    return res
      .status(400)
      .json({ Alert: "Question ID and Answer are required!" });
  }

  try {
    const question = await forumModel.findById(questionId);

    if (!question) {
      return res.status(404).json({ Alert: "Question not found!" });
    }

    const answerObj = {
      text: answer,
      answeredBy: answeredBy,
    };

    console.log(answerObj);

    question.answers.push(answerObj);
    await question.save();

    res.status(200).json({ Alert: "Answer added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Alert: "Internal Server Error" });
  }
});

// .post(async (req, res) => {
//   try {
//     const { question, description, topic, rating, by = "guest" } = req?.body;

//     if (!question || !topic) {
//       return res.status(400).json({ Alert: "NO Question/Topic!" });
//     }

//     const conflict = await forumModel.findOne({ question });

//     if (conflict) {
//       return res
//         .status(409)
//         .json({ Alert: `${question} was Already posted before!` });
//     }

//     const created = await forumModel.create({
//       question,
//       description,
//       topic,
//       rating,
//       by,
//     });

//     if (created) {
//       return res.status(201).json({ Alert: `${question} Added!` });
//     } else {
//       return res
//         .status(500)
//         .json({ Alert: "Failed to create the question." });
//     }
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ Alert: "An error occurred while processing your request." });
//   }
// });

router.route("/search").post(async (req, res) => {
  const { search } = req?.body;
  try {
    const regex = new RegExp(search, "i"); // 'i' flag for case-insensitive search
    const matches = await forumModel.find({ question: regex });

    console.log(matches);
    if (matches) {
      res.status(200).json(matches);
    } else {
      res.status(404).json({ Alert: "No results found!" });
    }
  } catch (err) {
    console.error(err);
  }
});

router.route("/delans/:id").delete(async (req, res) => {
  const id = req?.params?.id;
  const by = req.body.userID;
  if (!id || !by) {
    return res.status(400).json({ Alert: "No ID/Who Answered Provided!" });
  }

  const userExists = await userModel.findById(by);
  if (userExists) {
    try {
      const exists = await forumModel.findById(id);

      if (!exists) {
        return res.status(404).json({ Alert: "Invalid ID" });
      }

      await exists.answers.deleteOne();
      return res.status(200).json({ Alert: `Deleted ${id}` });
    } catch (error) {
      console.error("Error deleting document:", error);
      return res.status(500).json({ Alert: "Internal Server Error" });
    }
  }
});

router
  .route("/:id")
  .put(async (req, res) => {
    const { answer, whoAnswered = "guest" } = req.body; //by default the guest answers
    const id = req.params.id;

    if (!answer || !id) {
      return res.status(400).json({ Alert: "No `Answer` or ID Provided!" });
    }

    try {
      const exists = await forumModel.findById(id);
      if (!exists) {
        return res.status(404).json({ Alert: "Invalid ID" });
      }

      exists.answers.push({ text: answer, answeredBy: whoAnswered });
      await exists.save();

      return res.status(200).json({ Alert: `Updated ${id}` });
    } catch (error) {
      console.error("Error updating answer:", error);
      return res.status(500).json({ Alert: "Internal Server Error" });
    }
  })
  .delete(async (req, res) => {
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
  const userId = req.body.userId;

  if (!id) {
    return res.status(400).json({ Alert: "No ID" });
  }

  try {
    const verify = await forumModel.findByIdAndUpdate(
      id,
      { $inc: { rating: 1 } },
      { new: true }
    );

    if (!verify) {
      return res
        .status(404)
        .json({ Alert: `${id} is an invalid question ID!` });
    }

    const upvotedByUpdate = await userModel.findByIdAndUpdate(
      { _id: userId },
      { $inc: { nerdPoints: 5 }, $push: { upvotedBy: id } },
      { new: true }
    );

    if (!upvotedByUpdate) {
      return res.status(400).json({
        Alert: "Error while updating nerd points, perhaps user not logged in?",
      });
    }

    res.status(200).json({
      Alert: `Nerd Points Updated For The User ${userId}!`,
      Votes: `Upvotes updated to ${verify.rating}! Data ${JSON.stringify(
        verify
      )}`,
    });
  } catch (error) {
    res.status(500).json({ Alert: "Internal Server Error" });
  }
});

router.route("/nerds/:id").put(async (req, res) => {
  const id = req?.params?.id;
  const { userID = "65e82c4ae84d64fde8049ce4", theTotalUpvotes } = req?.body;

  console.log(`Payload ${id} and ${userID} , ${theTotalUpvotes}`);
  if (!id || !userID)
    return res.status(400).json({ Alert: "ID + userID are REQUIRED!" });
  try {
    const exists = await forumModel.findById(id);
    if (!exists) {
      return res.status(404).json({ Alert: `${String(id)} is invalid!` });
    } else {
      const updated = await userModel.findByIdAndUpdate(userID, {
        $inc: { nerdPoints: 5 },
      });

      // Check if the 'answers' array exists in the forum question
      if (!exists.answers || !exists.answers.noOfUpvotes) {
        // If not, create it and set the initial value to 1
        exists.answers = { noOfUpvotes: 1 };
      } else {
        // If it exists, increment the 'noOfUpvotes' field by 1
        exists.answers.noOfUpvotes++;
      }

      // Save the updated forum question
      await exists.save();

      res.status(200).json([{ forum: exists }, { user: updated }]);
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ Alert: "Internal Server Error" });
  }
});

router.route("/downvotes/:id").put(async (req, res) => {
  const id = req?.params?.id;
  const userId = req.body.userId;
  if (!id) {
    return res.status(400).json({ Alert: "No ID" });
  }
  try {
    const verify = await forumModel.findByIdAndUpdate(
      id,
      { $inc: { rating: -1 } },
      { new: true }
    );
    const nerdPointsUpdate = await userModel.findByIdAndUpdate(
      { _id: userId },
      { $inc: { nerdPoints: -1 } }
    ); //decrement points by 1
    if (!nerdPointsUpdate) {
      res.status(400).json({
        Alert: "Error while updating nerd points , perhaps user not logged in?",
      });
    } else {
      res.status(200).json({
        Alert: `Nerd Points Updated For The User ${nerdPointsUpdate}!`,
      });
    }
    if (!verify) {
      return res
        .status(404)
        .json({ Alert: `${id} brings an invalid question!` });
    }
    res.status(200).json({
      Votes: `Upvotes updated to ${verify.rating}! Data ${JSON.stringify(
        verify
      )}`,
    });
  } catch (error) {
    res.status(500).json({ Alert: "Internal Server Error" });
  }
});

module.exports = router;
