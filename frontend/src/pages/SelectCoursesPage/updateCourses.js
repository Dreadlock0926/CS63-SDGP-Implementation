import Axios from "axios"; // Assuming you've installed frontend-friendly axios
import initializeProbabilities from "../FeedbackPage/initializeProbabilities";
import updateLoggedUser from "./updateLoggedUser";

const updateCourses = async (userId, courseRef, courseKey) => {
  const response = await Axios.post(
    "http://localhost:8000/course/getTopicKeys",
    { sourceKey: courseKey }
  );

  const topicKeysArr = response.data.topicKeys;
  const userProgressArr = topicKeysArr.map((topicKey) => ({
    topicKey,
    userCompleted: false,
    tested: false,
  })); // Use map for concise object creation

  const course = {
    courseRef,
    userProgress: userProgressArr,
    courseKey,
  };

  const updateResponse = await Axios.post(
    "http://localhost:8000/course/updateCourse",
    { userId, courseToAdd: course }
  );

  await updateLoggedUser(userId).then((updatedUser) => {
    const userForStorage = { data: updatedUser }; // Wrap user object in data property
    sessionStorage.setItem("loggedUser", JSON.stringify(userForStorage));
  });

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

  return updateResponse.data;
};

export default updateCourses;
