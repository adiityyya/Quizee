import React, { useState, useEffect } from "react";
import "./Quiz.css";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Quiz = () => {
  const { state } = useLocation();
  const data = state?.quizData;

  console.log("this is quiz");
  console.log(data);

  const [index, setIndex] = useState(0); // Current question index
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const question = data[index]; // Current question

  const exit = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("user");

      setAuthUser(null);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const checkAns = (optionIndex) => {
    setSelectedOption(optionIndex);
    if (question.correctAnswer=== optionIndex+1) {
      setScore((prevScore) => prevScore + 1);
    }    
  };

  const nextQues = () => {
    if (index === data.length - 1) {
      setResult(true);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    }
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />

      {result ? (
        <div>
          <h2>Quiz Finished!</h2>
          <p>
            Your score is {score} out of {data.length}.
          </p>
          <button className="lbtn" onClick={exit}>
            Exit
          </button>
        </div>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li
                key={optionIndex}
                className={selectedOption === optionIndex ? "selected" : ""}
                onClick={() => checkAns(optionIndex)}
              >
                {option}
              </li>
            ))}
          </ul>
          <button className="btn" onClick={nextQues}>
            {index === data.length - 1 ? "Submit" : "Next"}
          </button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
