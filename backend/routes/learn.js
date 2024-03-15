const express = require("express");
const router = express.Router();
const learningModel = require("../models/learningResources");
const topicsModel = require("../models/topics");
const userModel = require("../models/user");

//needs to be put in a controller
//logic here must be changed
//we need multer if photo uploads are needed

router
  .route("/")
  .post(async (req, res) => {
    const { topic, title, about, subtopic, url } = req?.body;
    const { file: image } = req; //if uploading images is a must

    //we could implement images (cloudinary possibly) logic here if y'all want!

    if (!topic || !title) {
      return res
        .status(400)
        .json({ Alert: "Required fields not filled! (topic and title!)" });
    }

    try {
      const titleExists = await learningModel.findOne({ title });
      if (!titleExists) {
        await learningModel.create({
          topic,
          title,
          about,
          photo: image,
          subtopic,
          url,
        });
        res.status(201).json({ Alert: "Added Learning Resource to Learn" });
      } else {
        res.status(409).json({ Alert: `${title} Already Exists!` });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ Alert: "Internal Server Error" });
    }
  })
  .get(async (req, res) => {
    try {
      const data = await learningModel.find();
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
    }
  });

router.route("/topic/learned").post(async (req, res) => {
  const { theTopic } = req?.body;

  try {
    const theTopics = await learningModel.find({ source: theTopic });
    if (theTopics && theTopics.length) {
      res.status(200).json(theTopics);
    } else {
      res.status(404).json({ Alert: "No results found!" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Alert: err });
  }
});

router.route("/topic").post(async (req, res) => {
  const topic = req?.body?.topic;
  if (!topic) {
    const everything = await learningModel.find();
    if (everything && everything.length > 0) {
      res.status(200).json(everything);
    } else {
      res.status(203).json({ Alert: "No Resources found in general" });
    }
  } else if (topic === "Pure Mathematics I") {
    const pureMath = await learningModel.find({ topic: "Pure Mathematics I" });
    if (pureMath && pureMath.length > 0) {
      res.status(200).json(pureMath);
    } else {
      res.status(203).json({ Alert: "No Pure Mathematics Resources found!" });
    }
  } else if (topic === "Probability And Statistics") {
    const Statistics = await learningModel.find({
      topic: "Probability And Statistics",
    });
    if (Statistics && Statistics.length > 0) {
      res.status(200).json(Statistics);
    } else {
      res.status(203).json({ Alert: "No Statstics Resources found!" });
    }
  }
});

router.route("/completeLesson").post(async (req, res) => {
  try {
    const {
      userId = "65f471667a725acbb3ba057f",
      lessonName = "substitutionIntegration",
    } = req.body;

    if (!userId || !lessonName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let lessonIndex = -1;
    let topicIndex = 0;
    for (topicIndex = 0; topicIndex < user.lesson.length; topicIndex++) {
      const topicLessons = user.lesson[topicIndex].lessonProgress;
      lessonIndex = topicLessons.findIndex(
        (lesson) => lesson.lessonName === lessonName
      );
      if (lessonIndex !== -1) {
        break; // Found the lesson, stop iterating
      }
    }

    if (lessonIndex === -1) {
      return res.status(400).json({ message: "Lesson not found" });
    }

    user.lesson[topicIndex].lessonProgress[lessonIndex].completed = true;

    await user.save();

    res.json({ message: "Lesson marked as completed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.route("/create-user").post(async (req, res) => {
  if (!req.session.user) {
    //only someone who hasn't logged in can create an account
    const { username = "nibba", password = "213" } = req?.body;
    if (!username || !password)
      return res.status(400).json({ Alert: "Username/Password Missing!" });

    const validityUser = await userModel.findOne({ username });

    const lesson1 = {
      lessonName: "integrationArea",
      completed: false,
    };

    const lesson2 = {
      lessonName: "integrationByParts",
      completed: false,
    };

    const lesson3 = {
      lessonName: "substitutionIntegration",
      completed: false,
    };

    const topicProgress = {
      source: "p1",
      topic: "integration",
      lessonProgress: [lesson1, lesson2, lesson3],
    };

    if (!validityUser) {
      // const passwordAuth = bcrypt.hashSync(password, Math.random());

      await userModel.create({ username, password, lesson: [topicProgress] });

      return res.status(201).json({ Alert: `${username} Registered!` });
    } else {
      return res.status(409).json({ Alert: ` ${username} Already Exists!` });
    }
  } else {
    res.status(409).json({ Alert: "Please Logout to Register New Account!" });
  }
});

router
  .route("/progress/updates")
  .post(async (req, res) => {
    //this is not in the schema for the given userId = 65e5ee3fa014a87ba21c66d3
    const { userId, progress = 50 } = req?.body;
    const userExists = await userModel.findById(userId);
    if (!userExists) return res.status(404).json({ Alert: "Invalid user!" });

    const updated = await userExists.updateOne({
      progress: { $inc: progress },
    });

    if (!updated) {
      res.status(400).json({ Alert: "Error while updating!" });
    } else {
      res.status(200).json({ Alert: "Updated!" });
    }
  })
  .get(async (req, res) => {
    try {
      const { userId } = req?.body;
      const theData = await userModel.findById(userId);
      if (theData && theData.length) {
        res.status(200).json(theData);
      } else {
        res.status(404).json({ Alert: "No data found!" });
      }
    } catch (err) {
      console.error(err);
    }
  })
  .put(async (req, res) => {
    const { userId, progress } = req?.body;
    const userExists = await userModel.findById(userId);
    if (!userExists) {
      res.status(404).json({ Alert: "User not found!" });
    } else {
      const userProgress = await userExists.updateOne({
        learnedProgress: { $inc: progress },
      });
      if (userProgress) {
        res.status(200).json({ Alert: "Updated Progress!" });
      } else {
        res.status(400).json({ Alert: "Couldn't update!" });
      }
    }
  });

router.route("/topic/:id").post(async (req, res) => {
  const id = req?.params?.id;
  const topic = req?.body?.topic;
  if (!topic || !id) {
    res.status(400).json({ Alert: "Topic and ID is required!" });
  } else if (topic === "Pure Mathematics I") {
    const pureMath = await learningModel.find({ topic: "Pure Mathematics I" });
    if (pureMath && pureMath.length > 0) {
      res.status(200).json(pureMath);
    } else {
      res.status(203).json({ Alert: "No Pure Mathematics Resources found!" });
    }
  } else if (topic === "Probability And Statistics") {
    const Statistics = await learningModel.find({
      topic: "Probability And Statistics",
    });
    if (Statistics && Statistics.length > 0) {
      res.status(200).json(Statistics);
    } else {
      res.status(203).json({ Alert: "No Statstics Resources found!" });
    }
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

router.route("/search/:id").post(async (req, res) => {
  const id = req?.params?.id;
  const specificTopic = req?.body?.specificTopic;

  console.log(id);
  if (!id) return res.status(400).json({ Alert: "No ID" });

  try {
    const exists = await learningModel.findOne({ topic: specificTopic });

    console.log(exists);
    if (exists && exists.lessonPages.includes(id)) {
      const theSpecificTopic = exists;
      res.status(200).json(theSpecificTopic);
    } else {
      res.status(404).json({ Alert: "No Data!" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ Error: err.message });
  }
});

router.route("/test").post(async (req, res) => {
  const { source, topic, lessonPages } = req?.body;

  if (!source || !topic || !lessonPages)
    return res
      .status(400)
      .json({ Alert: "Source/Topic/Learned Pages REQUIRED" });

  const created = await learningModel.create({ source, topic, lessonPages });
  if (!created) {
    return res.status(500).json({ Alert: "Error while creating!" });
  } else {
    res.status(201).json({ Alert: "Created!" });
  }
});

module.exports = router;
