const express = require("express");
const router = express.Router();
const StudentModel = require("../model/studentModel");
const ApplicationModel = require("../model/applicationModel");
const SelectedModel = require("../model/selectedModel");
const JobModel = require("../model/jobModel");

router.post("/applyForJob", StudentModel.applyForJob);
router.post(
  "/findAllApplicationsWithJobDetails",
  ApplicationModel.findAllApplicationsWithJobDetails
);
router.post("/getSelectedCompany", SelectedModel.getSelectedCompany);
router.get("/getAllJobs", JobModel.getAllJobs);

module.exports = router; // Corrected export statement
