import React from "react";

const JobListing = ({ title, company, location, applyHandler }) => (
  <div className="job-listing">
    <h4>{title}</h4>
    <p>Company: {company}</p>
    <p>Location: {location}</p>
    <button onClick={applyHandler}>Apply</button>
  </div>
);
export default JobListing;
