// import React from "react";
// const JobDetails = ({
//   title,
//   company,
//   location,
//   applicants,
//   handleViewApplicants,
//   calculateEligibility,
//   calculateEligibleApplicants,
// }) => (
//   <div className="job-details">
//     <div className="job-details-header">
//       <h2>Job Title</h2>
//       <p>{location}</p>
//     </div>
//     <div className="job-details-skills">
//       <span className="job-skill">React</span>
//       <span className="job-skill">Node.js</span>
//       <span className="job-skill">MongoDB</span>
//     </div>
//     <div className="job-details-stats">
//       <div className="stat">
//         <p className="stat-label">Number of Applicants</p>
//         <p className="stat-value">{applicants.length}</p>
//       </div>
//       <div className="stat">
//         <p className="stat-label">Number of Eligible Applicants</p>
//         <p className="stat-value">{calculateEligibleApplicants(applicants)}</p>
//       </div>
//     </div>
//     <div className="job-details-actions">
//       <button className="job-details-btn">Change CGPA Requirement</button>
//       <button className="job-details-btn" onClick={handleUploadQuestion}>Set Coding Question</button>
//       {/* <button
//         className="job-details-btn"
//         onClick={() => handleViewApplicants(applicants)}
//       >
//         View Applicants
//       </button> */}
//     </div>
//   </div>
// );
// export default JobDetails;
import React from "react";
import { useNavigate } from "react-router-dom";
const JobDetails = ({
  title,
  company,
  location,
  applicants,
  handleViewApplicants,
  calculateEligibleApplicants,
}) => {
  // Define the handleUploadQuestion function
  const navigate = useNavigate();
  const handleUploadQuestion = () => {
    // Your logic for handling the upload question action
    console.log("Upload question clicked");
    navigate("/uploadquestion");
  };

  return (
    <div className="job-details">
      <div className="job-details-header">
        <h2>{title}</h2>
        <p>{location}</p>
      </div>
      <div className="job-details-skills">
        <span className="job-skill">React</span>
        <span className="job-skill">Node.js</span>
        <span className="job-skill">MongoDB</span>
      </div>
      <div className="job-details-stats">
        <div className="stat">
          <p className="stat-label">Number of Applicants</p>
          <p className="stat-value">{applicants.length}</p>
        </div>
        <div className="stat">
          <p className="stat-label">Number of Eligible Applicants</p>
          <p className="stat-value">
            {calculateEligibleApplicants(applicants)}
          </p>
        </div>
      </div>
      <div className="job-details-actions">
        <button className="job-details-btn">Change CGPA Requirement</button>
        <button className="job-details-btn" onClick={handleUploadQuestion}>
          Set Coding Question
        </button>
        {/* <button
          className="job-details-btn"
          onClick={() => handleViewApplicants(applicants)}
        >
          View Applicants
        </button> */}
      </div>
    </div>
  );
};

export default JobDetails;
