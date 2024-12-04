import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { QuizContextProvider } from "./context/QuizContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <QuizContextProvider>
          <App />
        </QuizContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
    <Toaster />
  </StrictMode>
);
