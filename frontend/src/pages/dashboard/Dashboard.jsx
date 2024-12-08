import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import toast from "react-hot-toast";
import { useAuthContext } from '../../context/AuthContext'

import { AiOutlinePlus,AiOutlineLogout  } from "react-icons/ai";
import Create from "../create/Create";
import { useQuizContext } from "../../context/QuizContext";

const Dashboard = () => {
  const {quizId, setQuizId} = useQuizContext();
  
  // const [quizId, setQuizId] = useState("");

  const navigate = useNavigate();
  const {setAuthUser} = useAuthContext();
  
  const handleCreateQuiz = () => {
    console.log("create clicked.")
    navigate('/create');
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("https://quizee-backend-eight.vercel.app/api/auth/logout", {
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
      toast.error("Error connecting to server.");
    }
  };
  const handleN = () =>{
    navigate('/quizzes');
  }
  const handleAttemptQuiz = async () => {
    //i got the quizId.
    //now hit the api.
    try {
      if (!quizId) {
        toast.error("Please enter a valid quiz ID.");
        return;
      }

      const response = await fetch(`https://quizee-backend-eight.vercel.app/api/quiz/start/${quizId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const questions = data.questions;
      
      // console.log(questions);

      if (response.ok) {
        navigate(`/quiz`, { state: { quizData: questions } });
      } else {
        toast.error(data.message || "Error starting quiz.");
      }
    } catch (error) {
      toast.error("Error connecting to server.");
    }
  };

  return (
    <div className="dashboard-container">
      
      <div className="dashboard-content">
        <h1>Welcome to Quizee</h1>
        <p>Select an option to proceed:</p>

        {/* Input field for quiz ID */}
        <div className="input-container">
          <input type="text" placeholder="Enter Quiz ID" value={quizId} onChange={(e)=>{setQuizId(e.target.value)}} />
        </div>
        <button onClick={handleN}>Your quizzes</button>
        {/* Buttons */}
        <div className="dashboard-buttons">
          {/* Create Quiz button with red color and plus sign */}
          <button onClick={handleCreateQuiz} className="create-quiz">
            <AiOutlinePlus /> Create Quiz
          </button>

          {/* Attempt Quiz button with blue color */}
          <button onClick={handleAttemptQuiz} className="attempt-quiz">Attempt Quiz</button>
        </div>
      <h5 className="alag">If you want to create a quiz, simply click on create! (No need to enter Quiz ID)</h5>
      </div>
      <div className="logout-icon" onClick={handleLogout}>
        <AiOutlineLogout />
      </div>
    </div>
  );
};

export default Dashboard;
