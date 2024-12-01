import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Quiz from "./components/quiz/Quiz";
import Login from "./pages/login/login";
import Signup from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

const App = () => {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={!authUser ? <Navigate to="/login"/> : <Quiz/>}/>
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
    </>
  );
};

export default App
