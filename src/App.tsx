import "./App.css";
import { useEffect, useState } from "react";
import StartPage from "./components/StartPage";
import { QuizContext } from "./helpers/QuizContext";
import QuizPage from "./components/QuizPage";
import ResultPage from "./components/ResultPage";
import NavigationPage from "./components/NavigationPage";

export default function App(): JSX.Element {
  const [page, setPage] = useState<string>("start");
  const [score, setScore] = useState<number>(0);
  const [question, setQuestion] = useState<number>(0);
  const [marked, setMarked] = useState<number[]>([]);
  const [viewed, setViewed] = useState<number[]>([1]);
  const [answered, setAnswered] = useState<number[]>([]);
  const [ansAndMarked, setAnsAndMarked] = useState<number>(0);
  const [classStyle, setClassStyle] = useState<string>("")

  
  useEffect(() => {
    setQuestion(0);
    setMarked([]);
    setViewed([1]);
    setAnswered([]);
    setAnsAndMarked(0);
  }, [page]);

  const handleViewedQuestions = (questionNum: number) => {
    const viewedQuestions: number[] = [...viewed];
    if (!viewedQuestions.includes(questionNum)) {
      viewedQuestions.push(questionNum);
    }
    setViewed(viewedQuestions.sort((a, b) => a - b));
  };
  
  return (
    <div>
      <QuizContext.Provider
        value={{
          answered,
          setAnswered,
          page,
          setPage,
          score,
          setScore,
          question,
          setQuestion,
          marked,
          setMarked,
          viewed,
          setViewed,
          handleViewedQuestions,
          ansAndMarked,
          setAnsAndMarked,
          classStyle,
          setClassStyle,
        }}
      >
        {page === `start` && <StartPage />}
        {page === `quiz` ? (
          <>
            <div className="layout">
              <QuizPage />
              <NavigationPage />
            </div>
            <div className="align-btn">
              <button className="submit-btn" onClick={() => setPage(`result`)}>
                Submit
              </button>
            </div>
          </>
        ) : (
          ""
        )}

        {page === `result` && <ResultPage />}
      </QuizContext.Provider>
    </div>
  );
}
