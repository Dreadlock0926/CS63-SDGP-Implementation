import Axios from "axios";

const initializeProbabilities = async (source) => {
  return new Promise(async (resolve, reject) => {
    try {
      let moduleProbabilities = {};
      const response = await Axios.post("http://localhost:8000/getTopics", {
        sourceKey: `${source}`,
      });

      // Directly update moduleProbabilities with topic keys and initial probabilities
      for (const topicKey in response.data.topicKeys) {
        moduleProbabilities[response.data.topicKeys[topicKey]] = -1.0;
      }

      resolve(moduleProbabilities);
    } catch (error) {
      reject(error);
    }
  });
};

export default initializeProbabilities;
