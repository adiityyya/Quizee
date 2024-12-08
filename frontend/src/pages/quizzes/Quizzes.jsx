import React, { useEffect, useState } from "react";
import './Quizzes.css'; // Ensure this CSS file is in place with necessary styles

// List of quizzes created by the current user
const Quizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [result, setResult] = useState(false);
    const [submissions, setSubmissions] = useState([]);

    // Fetch quizzes created by the current user
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await fetch("https://quizee-backend-eight.vercel.app/api/quiz/lists", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const data = await res.json();
                if (res.ok) {
                    setQuizzes(data.quizzes);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };
        fetchQuizzes();
    }, []);

    // Handle quiz card click and fetch the submissions for that quiz
    const handleQuizClick = async (quizId) => {
        try {
            const res = await fetch(`https://quizee-backend-eight.vercel.app/api/quiz/result/${quizId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = await res.json();

            if (res.ok) {
                setSubmissions(data.submissions);
                setResult(true);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching quiz results:", error);
        }
    };

    return (
        <div className="quizzes-container">
            <h1>Your Quizzes</h1>

            {result ? (
                <div className="submissions-list">
                    
                    {submissions.length===0?(<h2>No submissions yet!</h2>):(<h2>Submissions</h2>)}
                    {submissions.length===0?(<></>):(<div className="submission-cards">
                        {submissions.map((submission, index) => (
                            <div key={index} className="submission-card">
                                <p><strong>Email:</strong> {submission.email}</p>
                                <p><strong>Score:</strong> {submission.score}</p>
                                <p><strong>Submitted At:</strong> {new Date(submission.submittedAt).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>)}
                    
                    <button className="back-button" onClick={() => setResult(false)}>Back to Quizzes</button>
                </div>
            ) : (
                <div className="quiz-list">
                    {quizzes.length === 0 ? (
                        <p>You have not created any quizzes yet.</p>
                    ) : (
                        quizzes.map((quiz) => (
                            <div
                                key={quiz._id}
                                className="quiz-card"
                                onClick={() => handleQuizClick(quiz._id)}
                            >
                                <div className="quiz-title">{quiz.title}</div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Quizzes;
