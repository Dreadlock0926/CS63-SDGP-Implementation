import Axios from "axios";

const initializeProbabilities = async (loggedInUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let moduleProbabilities = {};

      const userStartedCourse = loggedInUser.courses.map(
        ({ courseKey }) => courseKey
      );

      for (const course in userStartedCourse) {
        let tempTopProb = {};

        await Axios.post("http://localhost:8000/getTopics", {
          sourceKey: userStartedCourse[course],
        })

          .then(function (response) {
            for (const topicKey in response.data.topicKeys) {
              tempTopProb[response.data.topicKeys[topicKey]] = -1;
            }
          })
          .catch(function (error) {
            console.log(error);
          });

        moduleProbabilities[userStartedCourse[course]] = tempTopProb;
      }

      resolve(moduleProbabilities);
    } catch (error) {
      reject(error);
    }
  });
};

export default initializeProbabilities;
