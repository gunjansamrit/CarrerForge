// AddJobModal.js
import React, { useState } from "react";
import axios from "axios";
import "./AddJobModal.css";

const AddJobModal = ({ onClose, companyId }) => {
  const [jobData, setJobData] = useState({
    jobTitle: "",
    description: "",
    degreeReq: "",
    cgpaReq: "",
  });

  const handleInputChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const job = {
      jobTitle: jobData.jobTitle,
      description: jobData.description,
      degreeReq: jobData.degreeReq,
      cgpaReq: jobData.cgpaReq,
    };
    const reqBody = {
      jobData: job,
      companyId: companyId,
    };
    try {
      const response = await axios.post(
        "http://localhost:3002/company/createJob",
        reqBody
      );
      console.log(response.data);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-overlay1">
      <div className="modal1">
        <h2>Add Job</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="jobTitle" className="label1">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={jobData.jobTitle}
              onChange={handleInputChange}
              className="input1"
            />
          </div>
          <div>
            <label htmlFor="description" className="label1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={jobData.description}
              onChange={handleInputChange}
              className="input1"
            />
          </div>
          <div>
            <label htmlFor="degreeReq" className="label1">
              Degree Requirement
            </label>
            <input
              type="text"
              id="degreeReq"
              name="degreeReq"
              value={jobData.degreeReq}
              onChange={handleInputChange}
              className="input1"
            />
          </div>
          <div>
            <label htmlFor="cgpaReq" className="label1">
              CGPA Requirement
            </label>
            <input
              type="text"
              id="cgpaReq"
              name="cgpaReq"
              value={jobData.cgpaReq}
              onChange={handleInputChange}
              className="input1"
            />
          </div>
          <button type="submit" className="action-button1">
            Submit
          </button>
          <button type="button" onClick={onClose} className="action-button1">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJobModal;
