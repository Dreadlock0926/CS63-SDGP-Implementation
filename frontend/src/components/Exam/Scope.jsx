/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import {useNavigation} from 'react-router-dom'
import Axios from "axios";
import Loading from "../Loading";

const Scope = () => {
  // const navigation = useNavigation(); //bugged out
  const { loading, setLoading } = useContext(UserContext);
  const [data,setData] = useState([])
  const [topics, setTopics] = useState({
      topic1:false,
      topic2:false,
      topic3:false
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
  
          const selectedTopics = topics.filter((x)=>x===true) //filtering anything that's selected to be sent
          const exam = await Axios.get("http://localhost:8000/exam/scope", { topics: selectedTopics }); //this path is not made yet!
          if (exam.status === 200) {
          setData(exam.data);
          } else {
            alert("Something went wrong!")
          }
      
    } catch (err) {
      console.error(err);
      alert("Error occurred!");
    } finally {
      setLoading(false);
    }
  };


  const selectAllTopics = async ()=>{
    // const checker = topics.forEach((x)=>x===false);  //verify this logic
    
      const exam = await Axios.get("http://localhost:8000/exam/scope" ); //this path is not made yet!
      if (exam.status === 200) {
        setData(exam.data);
        localStorage.setItem("exams",data);
        // navigator("/examination") //we must use this it's bugged out!
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

  // const selectionVal = document.querySelector(".selection");
  // if(selectionVal.innerHTML==="pure"){
  //   //show pure maths related topics
  // }else if(selectionVal.innerHTML==="stat"){
  //   //show stat related topics
  // }else{
  //   alert("Invalid option!") //no way this happens
  // }
  

  return (
    <div style={{margin:"5%",padding:"5%"}}>
                
      {loading ? (
        <Loading />
      ) : (      
        <div >   
           <select className="selection"><option value={"pure"}>Pure Maths</option><option value={"stat"}>Statistics</option></select>
           <br></br>
           <button onClick={selectAllTopics} disabled={toggle}>Select From All</button> 
          <p>{data&&data.length? JSON.stringify(data) : "No results found"}</p>   
          <br></br>
          <button onClick={selectTopics} className="action-button">{toggle?"Close Selector":`Select Specific Topics!`}</button>
          <br></br>
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
