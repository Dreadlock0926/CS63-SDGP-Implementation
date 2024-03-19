import Axios from "axios";

const initializeProbabilities = async (loggedInUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let moduleProbabilities = {};

      // Initialize empty objects for each source directly
      loggedInUser.lesson.forEach((lessonProgress) => {
        moduleProbabilities[lessonProgress.source] = {};
      });

      // Create an array of promises for each Axios request
      const topicPromises = Object.keys(moduleProbabilities).map(
        async (source) => {
          try {
            const response = await Axios.post(
              "http://localhost:8000/getTopics",
              {
                sourceKey: `${source}`,
              }
            );

            // Directly update moduleProbabilities with topic keys and initial probabilities
            for (const topicKey in response.data.topicKeys) {
              moduleProbabilities[source][response.data.topicKeys[topicKey]] =
                -1;
            }
          } catch (error) {
            console.error(error);
          }
        }
      );

      // Wait for all promises to resolve and return the result
      await Promise.all(topicPromises);
      resolve(moduleProbabilities);
    } catch (error) {
      reject(error);
    }
  });
};

export default initializeProbabilities;
