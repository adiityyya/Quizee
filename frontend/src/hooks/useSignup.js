import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const { setAuthUser } = useAuthContext();
  const signupFunc = async (name, email, password, confirmP) => {
    const success = handleInputErrors({ name, email, password, confirmP });

    if (!success) return;

    try {
      const res = await fetch("https://quizee-backend-eight.vercel.app/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmP }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { signupFunc };
};

export default useSignup;

function handleInputErrors({ name, email, password, confirmP }) {
  if (!name || !email || !password || !confirmP) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmP) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}
