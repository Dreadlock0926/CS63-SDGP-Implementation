/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import {  FidgetSpinner } from "react-loader-spinner";
import { Link } from "react-router-dom";
import {UserContext} from "../../App"
const Forum = () => {

  const {loading,setLoading,status,setStatus,log,user} = useContext(UserContext)
  const [data, setData] = useState([]);
  const [answer,setAnswer] = useState("")

  let meanVotes = 0;

  const EndPoint = "http://localhost:8000/forum";

  const increaseVotes = async (id) => {
    alert(`Request from ${id}`)
    try {
      setLoading(true);
      const upvote = await Axios.put(`${EndPoint}/upvotes/${id}`, {
        answer: updatedData,
      });
      const updatedData = data.map((item) =>
        item._id === id ? { ...item, upvotes: item.upvotes + 1 } : item
      );
      setData(updatedData);
     

      if (upvote.data.response.status === 200) {
        setStatus("Upvoted!");
      } else {
        setStatus("Error while upvoting!");
      }
      setInterval(() => {
        navigator("/forum");
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }; //route not made




  const forumData = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(EndPoint);
      setData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  async function AnsweringQuestions(id) {
    try {
      setLoading(true);
      const r = await Axios.post(`${EndPoint}/${id}`, answer);
      if (r.data.status === 200) {
        setStatus("Answer Posted!");
      }

      setTimeout(() => {
        navigator("/forum");
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }



  
  useEffect(() => {
    forumData();
  }, []);

  return log? <div>
    <h1>Welcome back {user.username}!</h1>
  <h1>Forum!</h1>
  {loading ? (
    <FidgetSpinner />
  ) : data && data.length ? (
    data.map((x) => (
      <div key={x._id}>
        <br></br>
        <br></br>
        <h1>Question {x.question}</h1>
        <h1>Answer {x?.answer ? x.answer : "Be the first to Answer! 🥳"}</h1>
        <p>Rating {x.rating?`Upvoted by ${x.rating}`:<h1>Rated by none!</h1>}</p>
        <button onClick={(e)=>{
          e.preventDefault();
          increaseVotes(x._id)}}>Upvote!</button> {/**Once clicked needs to increase number of votes by 1 */}
          <br></br>
          <form onSubmit={(e)=>{e.preventDefault();AnsweringQuestions(x._id)}}><input onChange={(e)=>{setAnswer(e.target.value)}} placeholder="Answer..." type="text"></input><button>Answer!</button></form>
        <br></br>
      </div>
    ))  
  ) : (
    <h1>No forum questions added yet!</h1>
  )}
  <Link to="/addforum">Add question to forum? 🤔</Link>
</div>:<div><h1>Please <Link to="/login">login</Link> to continue to the forum </h1></div>
};

export default Forum;
