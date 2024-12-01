import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmP, setConfirmP] = useState("");

  const { signupFunc } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("singup button dabaaya");

    await signupFunc(name,email, password,confirmP);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span>Welcome!</span>
        </div>
        <p className="title_para">Please enter your details to sign up.</p>

        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* <i className="fas fa-user"></i> */}
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>

          <div className="row">
            {/* <i className="fas fa-user"></i> */}
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>

          <div className="row">
            {/* <i className="fas fa-lock"></i> */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="row">
            {/* <i className="fas fa-lock"></i> */}
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmP}
              onChange={(e) => {
                setConfirmP(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <button className="sbtn">Sign up</button>
          </div>
          <div className="signup-link">
            Already a member? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
