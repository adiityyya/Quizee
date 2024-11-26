import React, { useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(false);

  const checkAns = (e, ans) => {
    setSelectedOption(ans);
    if (question.ans === ans) {
      setScore((score) => score + 1);
    }
  };
  const nextQues = () => {
    setIndex((index) => index + 1);
    if (index == data.length - 1) {
      setResult(true);
    }
    if (!result) {
      setQuestion(data[index + 1]);
    }
    setSelectedOption(null);
  };
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />

      {result ? (
        <div>
            <h2>Quiz Finished!</h2>
            <p>Your score is {score} out of {data.length}.</p>
        </div>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              className={selectedOption === 1 ? "selected" : ""}
              onClick={(e) => checkAns(e, 1)}
            >
              {question.opt1}
            </li>
            <li
              className={selectedOption === 2 ? "selected" : ""}
              onClick={(e) => checkAns(e, 2)}
            >
              {question.opt2}
            </li>
            <li
              className={selectedOption === 3 ? "selected" : ""}
              onClick={(e) => checkAns(e, 3)}
            >
              {question.opt3}
            </li>
            <li
              className={selectedOption === 4 ? "selected" : ""}
              onClick={(e) => checkAns(e, 4)}
            >
              {question.opt4}
            </li>
          </ul>
          <button onClick={nextQues}>{index==data.length-1?(<>Submit</>):(<>Next</>)}</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
