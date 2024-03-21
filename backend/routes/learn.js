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

router.route("/getLessonBodies").post(async (req, res) => {
  const { lessonTitle, topic, userId } = req?.body;

  if (!lessonTitle || !topic || !userId) {
    return res.status(400).json({ Alert: "Missing Request Body" });
  }

  const lesson = await topicsModel.findOne({
    "topicLesson.lessons.lessonTitle": lessonTitle,
  });

  if (!lesson) {
    return res.status(404).send("Lesson not found");
  }

  let lessonBody = null;

  // Extract and return the lessonBody from the found lesson
  for (const topicLesson of lesson.topicLesson) {
    if (topicLesson.topic === topic) {
      lessonBody = topicLesson.lessons.find(
        (lesson) => lesson.lessonTitle === lessonTitle
      ).lessonBody;
    }
  }

  console.log(lessonBody);

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).send("User not found");
  }

  let lessonProgressReturn = null;

  for (const topicProgress of user.lesson) {
    for (const lessonProgress of topicProgress.topicLesson) {
      if (lessonProgress.topic === topic) {
        lessonProgressReturn = lessonProgress;
      }
    }
  }

  const response = { lessonBody, lessonProgressReturn };

  res.status(200).json(response);
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
      userId = "65f86f434b9403f9d70d8aa3",
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

router.post("/testing-user", async (req, res) => {
  try {
    const { userID, source } = req.body; // Extract userID and source from request body

    // Validate userID
    if (!userID) {
      return res
        .status(400)
        .json({ message: "Missing userID in request body" });
    }

    const user = await userModel.findById(userID); // Find user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const lesson = user.lesson.find((lesson) => lesson.source === source); // Find specific lesson object
    if (!lesson) {
      return res
        .status(404)
        .json({ message: "Source not found for this user" });
    }

    const topicLessons = lesson.topicLesson; // Extract topicLesson array

    const topicCompletions = {}; // Object to store topic and completion percentage
    const topicFirstLesson = {};

    topicLessons.forEach((topicLesson) => {
      topicFirstLesson[topicLesson.topic] =
        topicLesson.lessonProgress[0].lessonName;
    });

    topicLessons.forEach((topicLesson) => {
      const completedCount = topicLesson.lessonProgress.filter(
        (lesson) => lesson.completed
      ).length;

      const lessons = topicLesson.lessonProgress.map(
        (lesson) => lesson.lessonName
      );

      const completedPercentage = Math.round(
        (completedCount / topicLesson.lessonProgress.length) * 100
      );
      topicCompletions[topicLesson.topic] = { completedPercentage, lessons };
    });

    res.status(200).json({ topicCompletions, topicFirstLesson }); // Send response object
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.route("/false-topic").post(async (req, res) => {
  try {
    const {
      userId = "65f86f434b9403f9d70d8aa3",
      topic = "Differentiation",
      source = "p1",
    } = req.body;

    if (!userId || !topic)
      return res.status(400).json({ Alert: "User id and topic required!" });

    const user = await userModel.findById(userId).populate("lesson.topicRef"); // Populate topic details

    if (!user) {
      return res.status(404).send("User not found");
    }

    const incompleteLessons = [];

    for (const topicProgress of user.lesson) {
      if (topicProgress.source === source) {
        for (const lessonProgress of topicProgress.topicLesson) {
          if (lessonProgress.topic === topic) {
            const incompleteLessonNames = lessonProgress.lessonProgress
              .filter((lesson) => !lesson.completed)
              .map((lesson) => lesson.lessonName);
            incompleteLessons.push(...incompleteLessonNames);
            break;
          }
        }
        break;
      }
    }

    res.status(200).json({ incompleteLessons, topic, source, user }); // Return array of incomplete lesson names
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.route("/fromtopics").post(async (req, res) => {
  try {
    const {
      userId = "65f86f434b9403f9d70d8aa3",
      topic = "Quadratics",
      source = "p1",
    } = req.body;
    console.log(req.body);

    const userExists = await userModel.findById(userId);
    if (!userExists) {
      return res.status(404).json({ Alert: "User not found!" });
    }

    const topicExists = await topicsModel.findOne({ sourceKey: source });

    if (topicExists) {
      console.log(`The topic length `);
      console.log(topicExists?.topicLesson?.length);
      for (let i = 0; i < topicExists?.topicLesson?.length; i++) {
        if (topicExists.topicLesson[i].topic === topic) {
          return res.status(200).json(topicExists.topicLesson[i].lessons);
        }
      }
      return res
        .status(404)
        .json({ Alert: "Topic not found for the given source" });
    } else {
      return res.status(404).json({ Alert: "Source not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
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
  .put(async (req, res) => {
    try {
      const { lessonName, userId, source, topic } = req.body; // Extract lessonName, userId, and source from request body

      // Validate request body
      // if (!lessonName || !userId || !source) {
      //   return res.status(400).json({
      //     message: "Missing lessonName, userId, or source in request body",
      //   });
      // }

      console.log(req.body);

      const user = await userModel.findById(userId); // Find user by ID
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedUser = user;

      // Find the lesson object to update, considering case sensitivity and source
      let found = false;

      for (const lessonProgress of updatedUser.lesson) {
        if (lessonProgress.source === source) {
          // Check if source matches

          for (const topicLesson of lessonProgress.topicLesson) {
            if (topicLesson.topic === topic) {
              // Check if topic matches

              for (const lesson of topicLesson.lessonProgress) {
                if (lesson.lessonName === lessonName) {
                  // Check if lesson matches
                  lesson.completed = true;
                  console.log("Lesson completed:", lesson);
                  // Update completed field
                  found = true;
                  break;
                }
              }
            }
          }
        }
      }

      if (!found) {
        return res
          .status(404)
          .json({ message: "Lesson not found for this user and source" });
      }

      // ... rest of the code remains the same (updating completed field and saving)
      await updatedUser.save();
      res
        .status(200)
        .json({ message: "Lesson marked as completed successfully" }); // Send response object
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
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
