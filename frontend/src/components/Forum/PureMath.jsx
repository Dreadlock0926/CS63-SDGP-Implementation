/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const PureMath = ({
  x,
  theKey,
  key,
  nerdPointsIncrement,
  increaseVotes,
  downVote,
  DeleteComment,
  AnsweringQuestions,
  answer,
  setAnswer,
}) => {
  return (
    <div key={theKey} className="card" style={{ marginBottom: "20px" }}>
      <Typography variant="h4">{x.topic}</Typography>
      <Typography variant="body2">{x.description}</Typography>
      <Typography variant="h4">{x.question}</Typography>
      {x?.answer ? (
        x.answer.map((answer, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <Typography variant="h6">{answer}</Typography>
            <Button onClick={() => nerdPointsIncrement(x._id)}>
              Give Points!
            </Button>
          </div>
        ))
      ) : (
        <Typography variant="h6">Be the first to Answer 🥳</Typography>
      )}
      <Typography variant="body2">{x.by ? `Posted by ${x.by}` : ""}</Typography>
      <Typography variant="body2">
        {x.rating ? `Upvoted by ${x.rating}` : "Rated by none"}
      </Typography>
      <Button onClick={() => increaseVotes(x._id)}>Upvote</Button>
      <Button onClick={() => downVote(x._id)}>DownVote</Button>
      <Button onClick={() => DeleteComment(x._id)}>Delete</Button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          AnsweringQuestions(x._id, answer);
        }}
      >
        <Input
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
          placeholder="Answer..."
          type="text"
        />
        <Button type="submit">Answer</Button>
      </form>
    </div>
  );
};

export default PureMath;
