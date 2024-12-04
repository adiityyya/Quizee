import { createContext, useContext, useState } from "react";

const QuizContext = createContext();


export const useQuizContext = () =>{
    return useContext(QuizContext);
};  

export const QuizContextProvider = ({children}) =>{
    const [quizId, setQuizId] = useState(JSON.parse(localStorage.getItem("quizId")) || null);

    const value = {
        quizId,
        setQuizId,
    }
    return (
        <QuizContext.Provider value = {value}>
            {children}
        </QuizContext.Provider>
    )
};

