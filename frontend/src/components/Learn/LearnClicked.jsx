/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import Axios from "axios";

const LearnClicked = () => {
  const { topicRelated, setTopicRelated, BASE } = useContext(UserContext);

  async function DisplayTopic() {
    try {
      const displayTheTopic = await Axios.post(`${BASE}/resources/false-topic`);
      setTopicRelated(displayTheTopic.data);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    DisplayTopic();
  }, []);

  return (
    <div>
      <h1>Learn Clicked</h1>
      {topicRelated.map((x) => {
        x.completed === false ? (
          <h1>{x.lessonName}</h1>
        ) : (
          <h1>All Topics Completed!</h1>
        );
      })}
      {JSON.stringify(topicRelated)}
    </div>
  );
};

export default LearnClicked;
