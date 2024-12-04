import React, { useState } from "react";
import toast from "react-hot-toast";
import "./QuizPopup.css";
import {useNavigate } from "react-router-dom";

const QuizPopup = ({ quizId, onClose }) => {
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(quizId);
    toast.success("Copied!");


    navigate("/");
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-header">
          <h3>Quiz ID</h3>
        </div>
        <div className="popup-body">
          <p>Your quiz ID is:</p>
          <div className="quiz-id-container">
            <input
              type="text"
              value={quizId}
              readOnly
              className="quiz-id-input"
            />
            <button onClick={handleCopy} className="copy-btn">
              Copy
            </button>
          </div>
        </div>
        <div className="popup-footer">
          <button onClick={onClose} className="close-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPopup;
