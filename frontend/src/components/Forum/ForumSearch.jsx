/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { UserContext } from "../../App";

const ForumSearch = () => {
  const { searched, setSearched } = useContext(UserContext);

  return (
    <div style={{textAlign:"center"}}>
      <h1>Forum Search</h1>
      <p>{JSON.stringify(searched)}</p>
    </div>
  );
};

export default ForumSearch;
