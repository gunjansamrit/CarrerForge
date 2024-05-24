// Login.jsx
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./Login.css";
import axios from "axios";
import { useLoginRoleContext } from "../../contexts/LoginRoleContext";
import { useUserIdContext } from "../../contexts/UserIdContext";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  //   const navigate = useNavigate(); // Initialize useNavigate
  const [role, setRole] = useState("Student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { getUserId, getUserToken, setIsUserLoggedIn } = useUserIdContext();
  const { getRole } = useLoginRoleContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // onLogin({ role, username, password });
    const reqBody = {
      username: username,
      password: password,
      role: role,
    };
    let roleUrl = role.charAt(0).toLowerCase() + role.slice(1);
    // let roleUrl = "Student";
    // console.log(reqBody);
    try {
      const response = await axios.post(
        "http://" + "localhost" + ":" + "3009" + "/" + roleUrl + "/login",
        // "http://192.168.49.2:30009" + "/" + roleUrl + "/login",
        // `${process.env.REACT_APP_BACKEND_URL}/${roleUrl}/login`,
        reqBody
      );
      // const responseData = response.json();
      console.log(response);
      if (role == "Student") {
        getUserId(response.data.studentId);
        getRole("student");
        navigate("/studentdashboard", {
          state: { details: response.data.student },
        });
      }
      if (role == "Admin") {
        getUserId(response.data.adminId);
        getRole("admin");
      }
      if (role == "Company") {
        getUserId(response.data.companyId);
        getRole("company");
        navigate("/companydashboard");
      }
      getUserToken(response.data.token);
      setIsUserLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const goToSignup = () => {
    // navigate("/signup"); // Navigate to the signup page
  };
  const example = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Role:</label>
          <select className="form-control" value={role} onChange={example}>
            <option value="Student">Student</option>
            <option value="Company">Company</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <div className="text-center mt-3">
        <p>Don't have an account?</p>
        <button className="btn btn-link" onClick={goToSignup}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
