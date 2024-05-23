const express = require("express");
const UserSolutionModel = require("../model/userSolutionModel");
const QuestionModel = require("../model/questionModel");
const CompanyModel = require("../model/companyModel");
const JobModel = require("../model/jobModel");
const CredentialsModel = require("../model/ credentialsModel");
const TestSelectedModel = require("../model/testSelectedModel");
const router = express.Router();
// const StudentModel = require("../models/studentModel");
// const ApplicationModel = require("../models/applicationModel");

// router.post('/applyForJob', StudentModel.applyForJob);
// router.get('/findAllApplicationsWithJobDetails', ApplicationModel.findAllApplicationsWithJobDetails);
router.post('/pythonTestSubmit', UserSolutionModel.pythonTestSubmit);
 router.post('/javaTestSubmit', UserSolutionModel.javaTestSubmit);
 router.post('/cppTestSubmit', UserSolutionModel.cppTestSubmit);
 router.post('/pythonTest', UserSolutionModel.pythonTest);
 router.post('/javaTest', UserSolutionModel.javaTest);
 router.post('/cppTest', UserSolutionModel.cppTest);
 router.post('/getAllQuestions', QuestionModel.getAllQuestions);
 router.get('/getCompanyIdsAndNames',CompanyModel.getCompanyIdsAndNames );
 router.post('/getJobProfilesByCompanyId',JobModel.getJobProfilesByCompanyId );
 router.post('/checkEligibility', CredentialsModel.checkEligibility);
 router.post('/finishCode', TestSelectedModel.finishCode);
  

 







module.exports = router; // Corrected export statement
