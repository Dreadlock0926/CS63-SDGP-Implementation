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
  const [toggle,setToggle] = useState(false);

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
          const data = await Axios.get("http://localhost:8000/exam/scope", { topics: selectedTopics }); //this path is not made yet!
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


  const selectAllTopics = async ()=>{
    const nopayload = await Axios.get("http://localhost:8000/exam/scope" ); //this path is not made yet!
    if (nopayload.status === 200) {
      alert("Success!");
    } else {
      alert("Error while getting data back!");
    }
  }

  useEffect(() => {
    console.log(`Selected topics: ${JSON.stringify(topics)}`);
  }, [topics]);

  function selectTopics(){
    setToggle(!toggle)
  }

  

  return (
    <div style={{margin:"5%",padding:"5%"}}>
      {loading ? (
        <Loading />
      ) : (
        <div >      
          <button onClick={selectTopics} className="action-button">{toggle?"Close Selector":`Select Specific Topics!`}</button>
          <br></br>
          <button onClick={selectAllTopics} disabled={toggle}>Select From All</button> 
          {toggle?           
          <form onSubmit={selectScope}>
        <span>
          <h1>Topic 1</h1>
          <input
            type="checkbox"
            name="topic1"
            checked={topics.topic1}
            onChange={() => handleTopicChange("topic1")}
          />
            <h1>Topic 2</h1>
          <input
            type="checkbox"
            name="topic2"
            checked={topics.topic2}
            onChange={() => handleTopicChange("topic2")}
          />
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
        <button type="submit" disabled={loading}>Select Topics</button>
      </form>:<div><h1></h1></div>}
</div>
        
      )}
    </div>
  );
};

export default Scope;
