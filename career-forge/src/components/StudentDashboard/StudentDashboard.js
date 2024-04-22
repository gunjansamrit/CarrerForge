import React, { useState } from "react";
import StudentDetails from "./StudentDetails";
import JobListings from "./JobListings";
import "./StudentDashboard.css";

const StudentPage = () => {
  const [studentDetails] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    gpa: 3.8,
    // Add more student details as needed
  });

  const [jobOpenings] = useState([
    { id: 1, position: "Software Engineer Intern", company: "ABC Corp" },
    { id: 2, position: "Data Analyst", company: "XYZ Ltd" },
    // Add more job openings as needed
  ]);

  const [filteredJobs, setFilteredJobs] = useState([...jobOpenings]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = jobOpenings.filter(
      (job) =>
        job.position.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm)
    );
    setFilteredJobs(filtered);
  };

  const handleApply = (jobId) => {
    // Add logic to handle job application
    console.log("Applied to job:", jobId);
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col">
          <StudentDetails details={studentDetails} />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <JobListings jobs={filteredJobs} handleApply={handleApply} />
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
