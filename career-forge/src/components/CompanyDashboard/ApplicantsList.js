import React from "react";
const ApplicantList = ({
  applicants,
  handleViewProfile,
  calculateEligibility,
  calculateEligibleApplicants,
}) => (
  <div className="applicant-list">
    <h3>Applicants</h3>
    <ul>
      {applicants
        .sort((a, b) => calculateEligibility(b) - calculateEligibility(a))
        .map((applicant) => (
          <li
            key={applicant.email}
            onClick={() => handleViewProfile(applicant)}
            className={`applicant-item ${
              calculateEligibility(applicant) ? "eligible" : "ineligible"
            }`}
          >
            <div className="applicant-info">
              <p>{applicant.name}</p>
              <p>{applicant.degree}</p>
            </div>
          </li>
        ))}
    </ul>
  </div>
);
export default ApplicantList;
