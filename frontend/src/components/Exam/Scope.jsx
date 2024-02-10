/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";
import Loading from "../Loading";

const Scope = () => {
  const { loading, setLoading } = useContext(UserContext);
  const [topics, setTopics] = useState({
    topic1: false,
    topic2: false,
    topic3: false,
    // Add more topics as needed
  });

  const handleTopicChange = (topic) => {
    setTopics((prevState) => ({
      ...prevState,
      [topic]: !prevState[topic],
    }));
  };


  const selectScope = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const selectedTopics = Object.keys(topics).filter((key) => topics[key]);
      const data = await Axios.post("http://localhost:8000/exam", { topics: selectedTopics }); //this path is not made yet!
      if (data.status === 200) {
        alert("Success!");
      } else {
        alert("Error while getting data back!");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(`Selected topics: ${JSON.stringify(topics)}`);
  }, [topics]);

  return (
    <div style={{margin:"5%",padding:"5%"}}>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={selectScope}>
          <span>
            <h1>Topic 1</h1>
            <input
              type="checkbox"
              name="topic1"
              checked={topics.topic1}
              onChange={() => handleTopicChange("topic1")}
            />
          </span>

          <span>
            <h1>Topic 2</h1>
            <input
              type="checkbox"
              name="topic2"
              checked={topics.topic2}
              onChange={() => handleTopicChange("topic2")}
            />
          </span>

          <span>
            <h1>Topic 3</h1>
            <input
              type="checkbox"
              name="topic3"
              checked={topics.topic3}
              onChange={() => handleTopicChange("topic3")}
            />
          </span>

          {/* Add more topics similarly */}
        <br></br>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Scope;
