import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import QuizPopup from "../../components/QuizPopup";
import {useQuizContext} from "../../context/QuizContext"

import "./Create.css";

const Create = () => {
  const [duration, setDuration] = useState("");
  const [numOfQuestions, setNumOfQuestions] = useState("");
  const [step, setStep] = useState(1);
  const [questionsArray, setQuestionsArray] = useState([]);
  const [title, setTitle] = useState("");

  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  let [correctAnswer, setCorrectAnswer] = useState("");


  // const [quizId, setQuizId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const {quizId, setQuizId} = useQuizContext();

  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1) {
      if (!duration || !numOfQuestions || !title) {
        toast.error(
          "Please fill in both the duration and number of questions."
        );
        return;
      }
      setStep(2); // Move to question entry step
    } 
    else if (step === 2) {
      if (
        !question ||
        !option1 ||
        !option2 ||
        !option3 ||
        !option4 ||
        !correctAnswer
      ) {
        toast.error("Please fill all question fields.");
        return;
      }

      correctAnswer = 81*correctAnswer +1 ;
      const newQuestion = {
        question,
        options: [option1, option2, option3, option4],
        correctAnswer,
      };

      setQuestionsArray((prev) => [...prev, newQuestion]);

      setQuestion("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setCorrectAnswer("");
    }
  };

  // Watch for changes in the questionsArray to handle quiz submission
  useEffect(() => {
    if (questionsArray.length === parseInt(numOfQuestions)) {
      handleSubmitQuiz();
    }
  }, [questionsArray]); 

  const handleSubmitQuiz = async () => {
    try {
      const response = await fetch("https://quizee-backend-eight.vercel.app/api/quiz/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          duration,
          questions: questionsArray,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Quiz created successfully!");

        localStorage.setItem("quizId", JSON.stringify(data.quizId));

        setQuizId(data.quizId); // Save the quiz ID to display in popup
        setShowPopup(true);

        // navigate("/");
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Error creating quiz!");
    }
  };

  return (
    <div className="create-container">
      <div className="form-card">
        <h3>{step === 1 ? "Quiz Details" : "Enter Question"}</h3>

        {step === 1 && (
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Quiz Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Enter quiz duration (in minutes)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Enter number of questions"
                value={numOfQuestions}
                onChange={(e) => setNumOfQuestions(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <button
                type="button"
                className="btn next-btn"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Option 1"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Option 2"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Option 3"
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Option 4"
                value={option4}
                onChange={(e) => setOption4(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="number"
                placeholder="Enter correct option (1-4)"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <button
                type="button"
                className="btn next-btn"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </form>
        )}
        {showPopup && (
        <QuizPopup
          quizId={quizId}
          onClose={() => setShowPopup(false)} // Close the popup when clicked
        />
      )}
      </div>
    </div>
  );
};

export default Create;
