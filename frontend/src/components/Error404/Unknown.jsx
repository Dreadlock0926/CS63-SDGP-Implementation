import { Link } from "react-router-dom";

const UnknownPage = () => {
  return (
    <div>
      <h1>Unknown Page ☹️</h1>

      <Link to="/">Back to Homepage?</Link>
    </div>
  );
};

export default UnknownPage;
