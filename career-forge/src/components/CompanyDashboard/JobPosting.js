import React from "react";
const JobPosting = ({
  title,
  company,
  location,
  applicants,
  handleViewJobDetails,
}) => (
  <div className="job-listing" onClick={() => handleViewJobDetails(applicants)}>
    <h4>{title}</h4>
    <p>Company: {company}</p>
    <p>Location: {location}</p>
  </div>
);
export default JobPosting;
