import React, { useState } from "react";
import "./CompanyDashboard.css";
import searchIcon from "../../resources/icons/search-icon.svg";
import JobPosting from "./JobPosting";
import JobDetails from "./JobDetails";
import ApplicantList from "./ApplicantsList";
const ProfileCard = ({ student, onClose }) => (
  <div className="profile-card-modal">
    <div className="profile-header">
      <img src={student.profileImage} alt="Profile" className="profile-image" />
      <div>
        <h3>{student.name}</h3>
        <p>{student.degree}</p>
      </div>
    </div>
    <div className="profile-details">
      <p>
        <strong>Email:</strong> {student.email}
      </p>
      <p>
        <strong>Skills:</strong> {student.skills.join(", ")}
      </p>
    </div>
    <button className="close-btn" onClick={onClose}>
      Close
    </button>
  </div>
);

const Company = () => {
  const [jobPostings, setJobPostings] = useState([
    {
      id: 1,
      title: "Software Engineer",
      company: "ABC Tech",
      location: "San Francisco, CA",
      applicants: [
        {
          name: "John Doe",
          email: "john.doe@example.com",
          degree: "Bachelor of Science in Computer Science",
          skills: ["React", "JavaScript", "Node.js", "Python"],
          profileImage: "https://via.placeholder.com/150",
        },
        {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          degree: "Master of Computer Science",
          skills: ["Java", "Python", "SQL", "Cloud Computing"],
          profileImage: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      id: 2,
      title: "Front-End Developer",
      company: "XYZ Corp",
      location: "New York, NY",
      applicants: [
        {
          name: "Michael Johnson",
          email: "michael.johnson@example.com",
          degree: "Bachelor of Science in Information Technology",
          skills: ["React", "Angular", "Vue.js", "CSS"],
          profileImage: "https://via.placeholder.com/150",
        },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [showApplicantModal, setShowApplicantModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedJobApplicants, setSelectedJobApplicants] = useState([]);

  const handleAddJob = () => {
    setIsAddingJob(true);
    // Add logic to handle job posting form
  };
  const calculateEligibility = (applicant) => {
    if (applicant.name == "Jane Smith") {
      return true;
    }
    return false;
  };
  const calculateEligibleApplicants = (applicants) => {
    return applicants.filter(calculateEligibility).length;
  };
  const handleViewJobDetails = (applicants) => {
    setSelectedJobApplicants(applicants);
  };

  const handleViewApplicants = () => {
    // No need to do anything here as the applicant list is already set in handleViewJobDetails
  };

  const handleViewProfile = (applicant) => {
    setSelectedApplicant(applicant);
    setShowApplicantModal(true);
  };

  const handleCloseApplicantModal = () => {
    setShowApplicantModal(false);
    setSelectedApplicant(null);
  };

  const filteredJobPostings = jobPostings.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    // Perform logout actions here
    console.log("Logging out...");
    // setIsUserLoggedIn(false);
    // localStorage.setItem("login", false);
    // localStorage.setItem("role", "");
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Company Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div className="container">
        <div className="job-postings">
          <div className="search-bar">
            <img src={searchIcon} alt="Search" className="search-icon" />
            <input
              type="text"
              placeholder="Search job postings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="job-postings-header">
            <h2>Job Postings</h2>
            <button className="add-job-btn" onClick={handleAddJob}>
              Add Job
            </button>
          </div>
          {filteredJobPostings.map((job) => (
            <JobPosting
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              applicants={job.applicants}
              handleViewJobDetails={handleViewJobDetails}
            />
          ))}
        </div>
        <div className="job-details-view">
          {selectedJobApplicants.length > 0 ? (
            <JobDetails
              title={selectedJobApplicants[0].title}
              company={selectedJobApplicants[0].company}
              location={selectedJobApplicants[0].location}
              applicants={selectedJobApplicants}
              handleViewApplicants={handleViewApplicants}
              calculateEligibility={calculateEligibility}
              calculateEligibleApplicants={calculateEligibleApplicants}
            />
          ) : (
            <div className="no-job-selected">
              <p>Click on a job posting to view details</p>
            </div>
          )}
        </div>
        <div className="applicant-view">
          {selectedJobApplicants.length > 0 && (
            <ApplicantList
              applicants={selectedJobApplicants}
              handleViewProfile={handleViewProfile}
              calculateEligibility={calculateEligibility}
              calculateEligibleApplicants={calculateEligibleApplicants}
            />
          )}
        </div>
      </div>
      {showApplicantModal && selectedApplicant && (
        <div className="modal-overlay">
          <div className="modal">
            <ProfileCard
              student={selectedApplicant}
              onClose={handleCloseApplicantModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Company;
