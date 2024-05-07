import "./ResultPage.css";
import { QuizContext } from "../helpers/QuizContext";
import { Questions } from "../helpers/Question";
import { useContext } from "react";
export default function ResultPage(): JSX.Element {
  const {score, setPage} = useContext(QuizContext);
  return (
    <div className="result">
      <p>
        You scored{" "}
        <strong>
          {" "}
          {score}/{Questions.length}
        </strong>
      </p>
      <div className="align-btn">
        <button className="submit-btn" onClick={() => setPage(`start`)}>
          Start Again
        </button>
      </div>
    </div>
  );
}
