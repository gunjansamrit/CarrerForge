import React, { useEffect, useState } from "react";
import axios from "axios";
const JobPosting = ({ job, handleViewJobDetails, cgpa }) => {
  const [applicants, setApplicants] = useState([]);
  useEffect(() => {
    cgpa(job.cgpaReq);
    console.log(job.cgpaReq);
    const fetchApplied = async () => {
      const reqBody = {
        jobId: job._id,
      };
      try {
        const response = await axios.post(
          "http://localhost:3002/company/getAllApplicants",
          reqBody
        );
        // setAppliedJobListings(response.data);
        console.log(response.data);
        setApplicants(response.data);
        // setJobPostings(response.data);s
        // alert("Applied Succefully");
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplied();
  }, []);

  return (
    <div
      className="job-listing"
      onClick={() => handleViewJobDetails(applicants)}
    >
      <div className="job-listing">
        <h4>{job.jobTitle}</h4>
        <p>{job.description}</p>
        <h4>Posting date - </h4>
        <p>{job.createdAt}</p>
      </div>
    </div>
  );
};
export default JobPosting;
