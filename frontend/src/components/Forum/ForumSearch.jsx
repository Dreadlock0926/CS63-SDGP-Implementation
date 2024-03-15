/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { Card, Button } from "react-bootstrap"; // Import Bootstrap components
import { Link } from "react-router-dom";
import Axios from "axios";
import All from "./All";

const ForumSearch = () => {
  const {
    searched,
    transfer,
    setSearched,
    search,
    setTransfer,
    status,
    setStatus,
    setSearch,
    loading,
    setLoading,
    upvoting,
    user,
    data,setData,
    toggle,setToggle,
  } = useContext(UserContext);
  const EndPoint = "http://localhost:8000/forum";

  const searchUp = async (e) => {
    e.preventDefault();
    try {
      const theData = await Axios.post(`${EndPoint}/search`, { search });
      console.log(theData.data);
      setSearched([]);
      setSearched(theData.data);
    } catch (err) {
      if (err.response.status === 404) {
        setStatus("No results found");
      }
      console.error(err);
    }
  };

  const increaseVotes = async (id) => {
    if (upvoting === 0) {
      try {
        setLoading(true);
        const response = await Axios.put(`${EndPoint}/upvotes/${id}`, {
          userId: user.id,
        });
        if (response.data.status === 200) {
          setStatus("Upvoted");
          setData((prevData) =>
            prevData.map((item) =>
              item._id === id ? { ...item, rating: item.rating + 1 } : item
            )
          );
        } else {
          setStatus("Error while upvoting");
        }
        setTimeout(() => {
          navigator("/forum");
        }, 2000);
      } catch (error) {
        console.error("Error while upvoting:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("already upvoted!");
    }
  };

  useEffect(() => {
    console.log(JSON.stringify(searched));
  }, [searched]); // Include searched in the dependency array

  return transfer === 1 ? (
    <div className="container">
      <form onSubmit={searchUp}>
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search here..."
          type="text"
        ></input>
        <button type="submit" disabled={loading}>
          Search...
        </button>
      </form>
      <h1 className="text-center mb-4" style={{ textAlign: "center" }}>
        Forum Search
      </h1>
      {searched && searched.length ? (
        <div>
          {searched.map((x, index) => (
            <div key={x._id || index}>
              {/* <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{x.question}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {x.topic}
                  </Card.Subtitle>
                  <Card.Text>{x.description}</Card.Text>
                  <Card.Text>Rating: {x.rating}</Card.Text>
                </Card.Body>
              </Card> */}
              <br />
              <All key={x._id} theKey={x._id} x={x} toggle={toggle} setToggle={setToggle}
                increaseVotes={increaseVotes}
                />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No results found</p>
      )}
      <Link to={"/forum"}>Back To Forum</Link>
    </div>
  ) : (
    "Nothing searched!"
  );
};

export default ForumSearch;
