import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Quiz from "./components/quiz/Quiz";
import Login from "./pages/login/Login";

import Signup from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Quizzes from "./pages/quizzes/Quizzes";

const App = () => {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={!authUser ? <Navigate to="/login"/> : <Dashboard/>}/>
        <Route path="/quizzes" element={!authUser ? <Navigate to="/login"/> : <Quizzes/>}/>
        <Route path="/create" element={!authUser ? <Navigate to="/login"/> : <Create/>}/>
        <Route path="/quiz" element={!authUser ? <Navigate to="/login"/> : <Quiz/>}/>
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/login" /> : <Signup />}
        />
      </Routes>
    </>
  );
};

export default App
