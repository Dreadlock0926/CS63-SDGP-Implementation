/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { Card, Button } from "react-bootstrap"; // Import Bootstrap components
import { Link } from "react-router-dom";
import Axios from "axios";

import ForumQuestion from "./ForumQuestion";

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
    data,
    setData,
    toggle,
    setToggle,
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

  return transfer === 1 ? (
    <div className="container">
      <Link to={"/forum"}>Back To Forum</Link>
      <h1 className="text-center mb-4" style={{ textAlign: "center" }}>
        Forum Search
      </h1>
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

      {searched && searched.length ? (
        <div>
          {searched.map((x, index) => (
            <div key={x._id || index}>
              <ForumQuestion questionData={x} theKey={index} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No results found</p>
      )}
    </div>
  ) : (
    window.location.replace("/forum")
  );
};

export default ForumSearch;
