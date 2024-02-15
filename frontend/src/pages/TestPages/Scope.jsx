/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Axios from "axios";

const Scope = () => {
  const [topics, setTopics] = useState(["Dam"]);
  const [topicSource, setTopicSource] = useState("Pure Mathematics I");

  const getTopics = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/addQuestion/getQuestionInfo",
        {
          source: topicSource,
        }
      );

      console.log(response.data);

      const newOptions = response.data.map((topic, i) => (
        <p key={i} value={topic}>
          {topic}
        </p>
      ));

      setTopics(newOptions);
    } catch (error) {}
  };

  useEffect(() => {
    getTopics();
  }, []);

  return (
    <div>
      <select
        name="cxz"
        id="zxcz"
        onChange={setTopicSource((e) => setTopicSource(e.target.value))}
      >
        <option value="p1">Pure Mathematics I</option>
        <option value="s1">Statistics I</option>
      </select>
      <h1>Scope</h1>
      <div>{topics}</div>
    </div>
  );
};

export default Scope;
