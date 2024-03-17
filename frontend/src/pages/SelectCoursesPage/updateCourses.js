import Axios from "axios"; // Assuming you've installed frontend-friendly axios
import initializeProbabilities from "../FeedbackPage/initializeProbabilities";
import updateLoggedUser from "./updateLoggedUser";

const updateCourses = async (userId, courseRef, courseKey) => {
  const response = await Axios.post("http://localhost:8000/course/getLessons", {
    topic: courseKey,
  });

  const lessonTitleArr = response.data;

  let topicArr = [];
  let lessonsArr;

  lessonTitleArr.forEach((topic) => {
    lessonsArr = [];
    topic.lessons.forEach((lesson) => {
      lessonsArr.push({
        lessonName: lesson.lessonTitle, // Access the property
        completed: false,
      });
    });
    topicArr.push({
      topic: topic.topic, // Access the property
      lessonProgress: lessonsArr,
    });
  });

  const topicLessonArr = {
    source: courseKey,
    topicRef: courseRef,
    topicLesson: topicArr,
  };

  const res = await Axios.post("http://localhost:8000/user/intialiazeLessons", {
    userId: userId,
    newLessonProgress: topicLessonArr,
  });

  console.log(res.data);

  await updateLoggedUser(userId).then(() => {});

  // No need to parse JSON again
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedUser")).data;

  await initializeProbabilities(loggedInUser).then((result) => {
    console.log(result);

    async function updateModuleProbability() {
      await Axios.post("http://localhost:8000/user/updateModuleProbabilities", {
        username: loggedInUser.username,
        topicProbabilities: result,
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    updateModuleProbability();

    window.location.href = "/select-course";
  });

  return response.data;
};

export default updateCourses;
