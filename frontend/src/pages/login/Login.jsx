import { useEffect, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { useQuizContext } from "../../context/QuizContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {loginFunc} = useLogin();

  const {quizId, setQuizId} = useQuizContext();

  useEffect(()=>{
    setQuizId("");
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login button dabaaya");

    await loginFunc(email, password);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span>Welcome back</span>
        </div>
        <p className="title_para">Please enter your details to sign in.</p>

        <form onSubmit={handleSubmit}>

          <div className="row">
            {/* <i className="fas fa-user"></i> */}
            <input type="text"
             placeholder="Enter your email" 
             value={email} 
             onChange={(e)=>{setEmail(e.target.value)}} 
             />
          </div>

          <div className="row">
            {/* <i className="fas fa-lock"></i> */}
            <input type="password" 
            placeholder="Password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
             />
          </div>
          <div>
            <button className="lbtn">Log in</button>
          </div>
          <div className="signup-link">
            Not a member? <Link to='/signup'>Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
