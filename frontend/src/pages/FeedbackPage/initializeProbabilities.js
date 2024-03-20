import Axios from "axios";

const initializeProbabilities = async (loggedInUser) => {

    return new Promise(async (resolve, reject) => {
        try {
            let moduleProbabilities = {};

            for (const course in loggedInUser.courses) {
        
                let tempTopProb = {};
        
                await Axios.post("http://localhost:8000/getTopics", {
                    sourceKey:`${loggedInUser.courses[course]}`
                })
                .then(function (response) {
                    for (const topicKey in response.data.topicKeys) {
                        tempTopProb[response.data.topicKeys[topicKey]] = -1;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                  })
        
                moduleProbabilities[loggedInUser.courses[course]] = tempTopProb;
            }
        
            resolve(moduleProbabilities);
        }
     catch (error){
        reject(error);
     }
    });
}

export default initializeProbabilities;