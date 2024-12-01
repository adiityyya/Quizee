import React, { useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(false);
  const {setAuthUser} = useAuthContext();
  const navigate = useNavigate();

  
  const exit = async () =>{

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
		} 
		catch (error) {
			toast.error(error.message);
		} 
  }
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
            <button className="lbtn" onClick={exit}>Exit</button>
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
          <button className="btn" onClick={nextQues}>{index==data.length-1?(<>Submit</>):(<>Next</>)}</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
