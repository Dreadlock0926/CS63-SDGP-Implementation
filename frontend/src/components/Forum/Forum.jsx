/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import {  FidgetSpinner } from "react-loader-spinner";
import { Link } from "react-router-dom";
import {UserContext} from "../../App"
const Forum = () => {

  const {loading,setLoading,status,setStatus} = useContext(UserContext)
  const [data, setData] = useState([]);

  let meanVotes = 0;

  const EndPoint = "http://localhost:8000/forum";

  // const increaseVotes = async (id) => {
  //   try {
  //     setLoading(true);
  //     const updatedData = data.map((item) =>
  //       item._id === id ? { ...item, upvotes: item.upvotes + 1 } : item
  //     );
  //     setData(updatedData);
  //     const upvote = await Axios.put(`${EndPoint}/x/${id}`, {
  //       upvotes: updatedData,
  //     });

  //     if (upvote.data.response.status === 200) {
  //       setStatus("Upvoted!");
  //     } else {
  //       setStatus("Error while upvoting!");
  //     }
  //     setInterval(() => {
  //       navigator("/forum");
  //     }, 2000);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }; //route not made

  function increaseVotes(id){
   
    alert(`Request came from ${id}`);
   
  }



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



  
  useEffect(() => {
    forumData();
  }, []);

  return (
    <div>
      <h1>Forum!</h1>
      {loading ? (
        <FidgetSpinner />
      ) : data && data.length ? (
        data.map((x) => (
          <div key={x._id}>
            <button onClick={()=>{meanVotes+=parseInt(x._id); alert(meanVotes)}}>Voting!</button>
            <h1>{x.question}</h1>
            <h2>{x?.answer ? x.answer : "Be the first to Answer! 🥳"}</h2>
            <p>{`Upvoted by ${x.rating}`}</p>
            <button onClick={(e)=>{
              e.preventDefault();
              increaseVotes(x._id)}}>Upvote!</button>
          </div>
        ))
      ) : (
        <h1>No forum questions added yet!</h1>
      )}
      <Link to="/addforum">Add question to forum? 🤔</Link>
    </div>
  );
};

export default Forum;
