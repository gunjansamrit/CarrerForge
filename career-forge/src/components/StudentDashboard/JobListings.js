// import React from "react";

// const JobListing = ({ job, applyHandler }) => (
//   <div className="job-listing">
//     <h4>{job.jobTitle}</h4>
//     <p>Company: {"Company"}</p>
//     <p>Description: {job.description}</p>
//     <p>Degree-Req: {job.degreeReq}</p>
//     <p>CGPA-Req: {job.cgpaReq}</p>
//     <p>Post-Date: {job.createdAt}</p>
//     <button onClick={applyHandler}>Apply</button>
//   </div>
// );
// export default JobListing;
import React from "react";

const JobListing = ({ job, applyHandler }) => {
  const companyName = job.companyId && job.companyId.companyName;
  return (
    <div className="job-listing">
      <h4>{job.jobTitle}</h4>
      <p>Company: {companyName}</p>
      <p>Description: {job.description}</p>
      <p>Degree-Req: {job.degreeReq}</p>
      <p>CGPA-Req: {job.cgpaReq}</p>
      <p>Post-Date: {job.createdAt}</p>
      <button onClick={applyHandler}>Apply</button>
    </div>
  );
};

export default JobListing;
