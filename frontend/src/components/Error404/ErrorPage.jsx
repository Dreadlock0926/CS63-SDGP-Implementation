import { Link } from "react-router-dom";
import "./ErrorPage.css";
import "../../pages/main.css";

const ErrorPage = () => {
  return (
    <>
      <div className="errorPageContainer">
        <h1 >Error 404: Page Not Found!</h1>
        <p>Welp! You landed in the emptiness! 😉</p>
        <Link className="linkBtn" to="/">Click here to get back to life.</Link>
      </div>
    </>
  );
};

export default ErrorPage;
