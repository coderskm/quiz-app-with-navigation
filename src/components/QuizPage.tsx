import "./QuizPage.css";
import { Questions } from "../helpers/Question";
import { QuizContext } from "../helpers/QuizContext";
import { useContext, useEffect } from "react";
export default function QuizPage(): JSX.Element {
  const {
    setAnsAndMarked,
    answered,
    setAnswered,
    setPage,
    handleViewedQuestions,
    setScore,
    question,
    setQuestion,
    marked,
    setMarked,
    setClassStyle
    
  } = useContext(QuizContext);

  useEffect(() => {
    const handleAnsAndMarked = () => {
      const updatedMarked = [...marked];
      const updatedAnswered = [...answered];
      let count = 0;
      for (let i = 0; i < updatedMarked.length; i++) {
        const track = updatedMarked[i] - 1;
        if (updatedAnswered[track]) {
          count++;
        }
      }
      setAnsAndMarked(count);
    };
    handleAnsAndMarked();
  },[answered,marked])

  

  useEffect(() => {
    const calculateScore = () => {
      let score: number = 0;
      for (let i = 0; i < Questions.length; i++) {
        if (Questions[i].answer === answered[i]) {
          score++;
        }
        setScore(score);
      }
    };
    calculateScore();
  },[answered])
  

  const handleNextClick = (question: number) => {
    setQuestion((question: number) => question + 1);
    handleViewedQuestions(question + 1);
  };
  const handlePreviousClick = (question: number) => {
    setQuestion((question: number) => question - 1);
    handleViewedQuestions(question + 1);
  };
  const handleOptionChange = (index: number, option: string) => {
    const updatedAnswer: string[] = [...answered];
    updatedAnswer[index] = option;
    setAnswered(updatedAnswer);
  };
  const handleClear = (index: number) => {
    const updatedAnswer: string[] = [...answered];
    updatedAnswer.splice(index, 1,"");
    setAnswered(updatedAnswer);
    
  };
  const handleMarkedClick = (questionNum: number) => {
    const markedQuestions: number[] = [...marked];
    if (!markedQuestions.includes(questionNum)) {
      markedQuestions.push(questionNum);
    }
    setMarked(markedQuestions.sort((a, b) => a - b));
    setClassStyle('marked-btn');
  };

  return (
    <>
      <div className="quiz">
        <h1>Question</h1>
        <div className="question">
          <p>
            <strong>Question {question + 1}:</strong>
            <br />
            <hr />
          </p>
          <p>{Questions[question].question}</p>

          {Questions[question].options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <label>
                <input
                  type="radio"
                  value={option}
                  checked={answered[question] === option}
                  onChange={() => handleOptionChange(question, option)}
                />
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className="btn-style">
          <button disabled={question === 0} onClick={() => handlePreviousClick(question - 1)}>
            Previous
          </button>
          <button disabled={!answered[question]} onClick={() => handleClear(question)}>
            clear
          </button>
          <button onClick={() => handleMarkedClick(question + 1)}>marked</button>
          {question === Questions.length - 1 ? (
            <button onClick={() => setPage(`result`)}>Finish</button>
          ) : (
            <button onClick={() => handleNextClick(question + 1)}>Next</button>
          )}
        </div>
      </div>
    </>
  );
}
