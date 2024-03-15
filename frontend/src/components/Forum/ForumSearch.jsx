/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { Card, Button } from "react-bootstrap"; // Import Bootstrap components

const ForumSearch = () => {
  const { searched, transfer } = useContext(UserContext);

  useEffect(() => {
    console.log(JSON.stringify(searched));
  }, [searched]); // Include searched in the dependency array

  return transfer === 1 ? (
    <div className="container">
      <h1 className="text-center mb-4">Forum Search</h1>
      {searched && searched.length ? (
        searched.map((x, index) => (
          <Card key={x._id || index} className="mb-3">
            <Card.Body>
              <Card.Title>{x.question}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{x.topic}</Card.Subtitle>
              <Card.Text>{x.description}</Card.Text>
              <Card.Text>Rating: {x.rating}</Card.Text>
              <Button variant="primary">View Details</Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-center">No results found</p>
      )}
    </div>
  ) : (
    "Nothing searched!"
  );
};

export default ForumSearch;
