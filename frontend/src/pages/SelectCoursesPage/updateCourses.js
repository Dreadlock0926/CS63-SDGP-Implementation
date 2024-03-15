import Axios from "axios"; // Assuming you've installed frontend-friendly axios

const updateLoggedUser = async (userId, courseRef, courseKey) => {
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

  return updateResponse.data;
};

export default updateLoggedUser;
