import React from "react";
import "./App.css";
import Company from "./components/CompanyDashboard/CompanyDashboard";
import Login from "./components/LoginAndSignUp/Login";
import Student from "./components/StudentDashboard/StudentDashboard";
import { useUserIdContext } from "./contexts/UserIdContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
const App = () => {
  const { isUserLoggedIn } = useUserIdContext();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
        {isUserLoggedIn && (
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
            <Route path="/companydashboard" element={<Company />} />
            {/* <Route path="/admindashboard" element={<PatientDashboard />} /> */}
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
