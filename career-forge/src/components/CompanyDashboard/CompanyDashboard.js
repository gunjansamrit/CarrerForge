import React, { useState, useEffect } from "react";
import "./CompanyDashboard.css";
import searchIcon from "../../resources/icons/search-icon.svg";
import JobPosting from "./JobPosting";
import JobDetails from "./JobDetails";
import { useLocation } from "react-router-dom";
import ApplicantList from "./ApplicantsList";
import axios from "axios";
import AddJobModal from "./AddJobModal";
const ProfileCard = ({ student, onClose }) => (
  <div className="profile-card-modal">
    <div className="profile-header">
      <img
        className="profile-image"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAmFJREFUSEvl1knIjVEcx/HPS+aNcWVnYSND5lKmiNgQC2RFyZBMCymlWFjItEBSNkRKSUJIFBtTkSHWZCEkRZHp+b+dt+77vPfe57n3vvUunN29zzm/7/kP53dOmx4abT3E1Qy4N8ZhStr0QzzH70aCaBS8DEcxMgd5i824XBbeCPgwthYIH8KOMvCy4Pm4mQQfYReepN+TsL8i9XNxpwheFnwL81ItJ+NnTrgvHmMsrmNRd4B74Rv6YxOO1xDdiGP4mvXBEPypBy8TcXTwsySyGNdqCEaUV9O3MXjVKjg6+F0SWYXzNQRX4lz6FmvetwqO9Z8wFPW69mCW5u34mKV8RHfUODT2YXcyiaW4khNegovZvDCXPdjbXeBorJcYlQTvpy7ukzp5Zvr/TXK1fNd32UeZ5upYFE12NoGqBRS2GXWODRaORsAhFkdrAxZgepb+XynyOLsni45Q5W4aBRdGUnZCWfAwzMhcaRrCufrlAD9S5A8yh4v6fy7aQBF4MA5gLaWv0L8p7TuTi1XdQz3wcpzA8IqV35OLVfPq8RhYMfcD1uNSNXItcFzykbaO76dxBC+ycxoR1dKKS2IL1qQJMXdqKkOnNdXAcdPE0RiNiHAh7hXVLPd9VvL0yMDrLOrIRqcsVQOHLW5LQuuy18apBqEd0yPNUaoYXay2GjiiHIAbKdomue3LbiMeBqE5qN45jmMTJh9jBS60QsVqnEkacUd/6dDLRzyx4kkTtY2oWxmVd3RYbvRO+8iDZ1e8l+bgbivUbH1NvTw4DGNCgj2tTE2TG6ipV+RcTfKKl/1/4H9Qfmkf+jdIxwAAAABJRU5ErkJggg=="
      />
      <div>
        <h3>
          {student.name.firstName +
            " " +
            student.name.middleName +
            " " +
            student.name.lastName}
        </h3>
        <p>{student.highestEducation}</p>
        <h4>CGPA</h4>
        <p>{student.cgpa}</p>
      </div>
    </div>
    <div className="profile-details">
      <p>
        <strong>Email:</strong> {student.email}
      </p>
      {/* <p>
        <strong>Skills:</strong> {student.skills.join(", ")}
      </p> */}
    </div>
    <button className="close-btn" onClick={onClose}>
      Close
    </button>
  </div>
);

const Company = () => {
  const [jobPostings, setJobPostings] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [showApplicantModal, setShowApplicantModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedJobApplicants, setSelectedJobApplicants] = useState([]);
  const location = useLocation();
  const { details } = location.state || {};
  const [cgpa, setCgpa] = useState(0);

  const calculateEligibility = (applicant) => {
    if (applicant.cgpa >= cgpa) {
      return true;
    }
    return false;
  };
  const calculateEligibleApplicants = (applicants) => {
    return applicants.filter(calculateEligibility).length;
  };
  const handleViewJobDetails = (applicants) => {
    console.log("Hi");
    console.log(applicants);
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
      // job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // job.company.toLowerCase().includes(searchTerm.toLowerCase())
      true
  );
  const handleAddJob = () => {
    setIsAddingJob(true);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const reqBody = {
        companyId: details._id,
      };
      try {
        const response = await axios.post(
          "http://localhost:3002/company/getAllJobsByCompanyId",
          reqBody
        );
        // setAppliedJobListings(response.data);
        console.log(response.data);
        setJobPostings(response.data);
        // alert("Applied Succefully");
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

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
              job={job}
              cgpa={setCgpa}
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
      {isAddingJob && (
        <AddJobModal
          onClose={() => setIsAddingJob(false)}
          companyId={details._id}
        />
      )}
    </div>
  );
};

export default Company;
