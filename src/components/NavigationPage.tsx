import "./NavigationPage.css";
import { Questions } from "../helpers/Question";
import { QuizContext } from "../helpers/QuizContext";
import { useContext, useEffect, useState } from "react";

export default function NavigationPage(): JSX.Element {
  const { answered, ansAndMarked, setQuestion, marked, viewed, handleViewedQuestions } =
    useContext(QuizContext);
  const [totalAnswered, setTotalAnswered] = useState(0); 

  const handleClass = (index:number) => {
    const updatedViewed = [...viewed];
    const updatedAnswered = [...answered];
    const updatedMarked = [...marked];
    console.log("marked", updatedMarked)
    console.log("answered",updatedAnswered)
    console.log("viewed", updatedViewed)
    if (updatedAnswered[index]) {
      return "answered-btn";
    }
    
      if (updatedMarked.includes(index+1)) {
        return "marked-btn";
      }
     if (updatedViewed.includes(index + 1)) {
      return "notanswered-btn"
    }
    
  }


  const handlebtnClick = (index: number) => {
    setQuestion(index);
    handleViewedQuestions(index + 1);
  };
  
    useEffect(() => {
    const handleAnswered = () => {
      const answerArray = [...answered];
      let total = 0;
      for (let i = 0; i < answerArray.length; i++) {
        if (answerArray[i]) {
          total++;
        }
      }
      setTotalAnswered(total);
    };
    handleAnswered();
  }, [answered])
  
 
   
  return (
    <div className="nav">
      <h1>Navigation</h1>
      <div className="information">
        <div className="info-item">
          <div>
            <button className="answered">{totalAnswered}</button>
            <p>Answered</p>
          </div>
          <div>
            <button className="not-answered">{Questions.length - totalAnswered}</button>
            <p>Not<br/> Answered</p>
          </div>
        </div>
        <div className="info-item">
          <div>
            <button className="marked-qns">{marked.length}</button>
            <p>Marked</p>
          </div>
          <div>
            <button className="marked-qns">{ansAndMarked}</button>
            <p>
              Answered <br /> & Marked
            </p>
          </div>
        </div>
        <div className="info-item">
          <div>
            <button className="viewed">{viewed.length === 0 ? 1 : viewed.length}</button>
            <p>Visited</p>
          </div>
          <div>
            <button className="not-viewed">{Questions.length - viewed.length}</button>
            <p>Not Visited</p>
          </div>
        </div>
        {}
      </div>
      <div className="nav-btn">
        {Questions.map((_, index) => (
          <button
            key={index}
            className={handleClass(index) ? handleClass(index) : "original-btn"}
            onClick={() => handlebtnClick(index)}
          >
            {index >= 0 && index <= 8 ? `0${index + 1}` : `${index + 1}`}
            {/* {index + 1} */}
          </button>
        ))}
      </div>
      {marked.length !== 0 && (
        <div className="marked">
          <p> Marked Questions :-</p>
          <div className="all-marked-btn">
            {marked.map((item: number, index: number) => (
              <button key={index} onClick={() => setQuestion(item - 1)}>
                {item >= 1 && item <= 9 ? `0${item}` : `${item}`}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
