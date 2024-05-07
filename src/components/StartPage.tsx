import "./StartPage.css";
import { QuizContext } from "../helpers/QuizContext";
import { useContext } from "react";

export default function StartPage(): JSX.Element {
    const {setPage} = useContext(QuizContext);
  return (
      <div className="start-page">
          <h1>Welcome To Quiz</h1>
          <button className="btn" onClick={()=>setPage('quiz')}>Start Quiz</button>
    </div>
  )
}
