const express = require("express");
const UserSolutionModel = require("../model/userSolutionModel");
const QuestionModel = require("../model/questionModel");
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







module.exports = router; // Corrected export statement
