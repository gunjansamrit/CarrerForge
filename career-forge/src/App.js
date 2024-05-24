import React from "react";
import "./App.css";
import Company from "./components/CompanyDashboard/CompanyDashboard";
import Login from "./components/LoginAndSignUp/Login";
import Student from "./components/StudentDashboard/StudentDashboard";
import { useUserIdContext } from "./contexts/UserIdContext";
import { useLoginRoleContext } from "./contexts/LoginRoleContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
const App = () => {
  const { isUserLoggedIn } = useUserIdContext();
  const { who } = useLoginRoleContext();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
        {isUserLoggedIn && who == "student" && (
          <>
            {/* <Route
              path="/patientregistration"
              element={<PatientRegistration email={email} credId={credId} />}
            />
            <Route
              path="/newpatient"
              element={
                <NewPatient
                  onSubmitEmail={handleSubmitEmail}
                  onSubmitCred={handleCredId}
                />
              }
            /> */}
            <Route path="/studentdashboard" element={<Student />} />
            {/* <Route path="/admindashboard" element={<PatientDashboard />} /> */}
          </>
        )}
        {isUserLoggedIn && who == "company" && (
          <>
            {/* <Route
              path="/patientregistration"
              element={<PatientRegistration email={email} credId={credId} />}
            />
            <Route
              path="/newpatient"
              element={
                <NewPatient
                  onSubmitEmail={handleSubmitEmail}
                  onSubmitCred={handleCredId}
                />
              }
            /> */}
            <Route path="/companydashboard" element={<Company />} />
            {/* <Route path="/admindashboard" element={<PatientDashboard />} /> */}
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
