// Signup.jsx
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./SignUp.css";

const Signup = ({ onSignup }) => {
  //   const navigate = useNavigate(); // Initialize useNavigate
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    // e.preventDefault();
    // onSignup({ username, password });
  };

  const goToLogin = () => {
    // navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
      <div className="text-center mt-3">
        <p>Already have an account?</p>
        <button className="btn btn-link" onClick={goToLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Signup;
