import { createContext, useContext, useState } from "react";
// import { json } from "react-router-dom";

//pehle create the object.

const AuthContext = createContext();

//then use.
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const value = {
        authUser,
        setAuthUser,
    };
    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    );
};
