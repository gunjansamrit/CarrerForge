// AppliedJobsModal.js
import React from "react";

const AppliedJobsModal = ({ appliedJobListings, onClose }) => (
  <div className="modal-overlay">
    <div className="modal">
      <h2>Applied Jobs</h2>
      <ul>
        {appliedJobListings.map((job) => (
          <li key={job._id}>
            <h3>{job.job.jobTitle}</h3>
            <p>Company: {job.companyName}</p>
            <p>Posted at: {job.job.createdAt}</p>
          </li>
        ))}
      </ul>
      <button className="close-btn" onClick={onClose}>
        Close
      </button>
    </div>
  </div>
);

export default AppliedJobsModal;
