/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import {  FidgetSpinner } from "react-loader-spinner";
import { Link } from "react-router-dom";
import {UserContext} from "../../App"
import "./Forum.css";



const PureForum = () => {


  const forumStyle = {
    // CSS for the Forum Component
    '*': {
      fontFamily: 'Poppins, Courier, monospace',
    },
    
    // Container
    div: {
      margin: '20px',
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    
    // Headings
    h1: {
      fontSize: '24px',
      marginBottom: '10px',
    },
    
    // Fidget Spinner
    '.spinner': {
      margin: '20px auto',
    },
    
    // Forum Questions
    '.question': {
      marginBottom: '30px',
    },
    
    // Answer Form
    form: {
      marginTop: '10px',
    },
    
    'input[type="text"]': {
      width: '70%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    
    'button:hover': {
      backgroundColor: '#0056b3',
    },
    
    // Link
    a: {
      color: '#007bff',
      textDecoration: 'none',
    },
    
    'a:hover': {
      textDecoration: 'underline',
    }
  };
  
  const {loading,setLoading,status,setStatus,logged,user} = useContext(UserContext)
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
      const r = await Axios.put(`${EndPoint}/${id}`, answer);
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

  async function DeleteComment(id){
    try{
      const deleteRequest = await Axios.delete(`${EndPoint}/${id}`)
      if(deleteRequest.status===200){
        alert("Deleted Question!")
      }else{
        alert("Couldn't delete question!")
      }
    }catch(err){
      console.error(err);
    }
  }



  
  useEffect(() => {
    forumData();
  }, []);

  return logged? <div >
    <h1>Welcome back {user.username}!</h1>
  <h1>Pure Maths Forum!</h1>
  {loading ? (
    <FidgetSpinner />
  ) : data && data.length ? (
    data.map((x) => (
      <div key={x._id}>
        {x.topic==="pure"?    //change this
        <div> <br></br>
        <br></br>
        <h1> {x.question}</h1>
        <h1>{x?.answer ? x.answer : "Be the first to Answer! 🥳"}</h1>
        <p>{x.by?`Posted by ${x.by}`:""}</p>
        <p>{x.rating?`Upvoted by ${x.rating}`:<h1>Rated by none!</h1>}</p>
        <button onClick={(e)=>{
          e.preventDefault();
          increaseVotes(x._id)}}>Upvote!</button> {/**Once clicked needs to increase number of votes by 1 */}
           <button onClick={(e)=>{
          e.preventDefault();
          DeleteComment(x._id)}}>Delete</button> {/**Once clicked needs to increase number of votes by 1 */}
          <br></br>
          <form onSubmit={(e)=>{e.preventDefault();AnsweringQuestions(x._id)}}><input onChange={(e)=>{setAnswer(e.target.value)}} placeholder="Answer..." type="text"></input><button>Answer!</button></form></div>
        :<h1></h1>} {/**showing topic names of the ones that are not stat for now we can completely get rid of this lol! */}
      </div>
    ))  
  ) : (
    <h1>No forum questions added yet!</h1>
  )}
  <Link to="/addforum">Add question to forum? 🤔</Link>
</div>:<div><h1>Please <Link to="/login">login</Link> to continue to the forum </h1></div>
};

export default PureForum;
