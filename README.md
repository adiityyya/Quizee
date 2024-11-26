A simple yet powerful quiz application built using the MERN stack (MongoDB, Express.js, React, Node.js). This app allows users to create quizzes, take quizzes with time constraints, and view their results. Designed to ensure fairness, only one user per email can access a particular quiz to prevent cheating.

## Features
🌟 **User Authentication**: Secure login with JWT authentication.  
🌟 **Quiz Creation**: Teachers or admins can create quizzes with multiple-choice questions, set a duration, and get a unique quiz URL.  
🌟 **Timed Quiz**: Quizzes have a time limit. Once the timer expires, the quiz is automatically submitted.  
🌟 **Single Access per Email**: A quiz can only be accessed by a specific email once. Attempts to re-access from another device or browser are blocked.  
🌟 **Real-Time Scoring**: As users answer the questions, their score is calculated in real-time and displayed at the end of the quiz.  
🌟 **Result Submission**: Once completed, users submit their scores, which are recorded in the database.  
🌟 **Admin Panel**: Quiz creators can view the list of submissions and analyze quiz results.

## Tech Stack
- React.js
- Node.js
- Express.js
- MongoDB
- Mongoose
