const express = require("express");
const router = express.Router();
const CompanyModel = require("../model/companyModel");
const JobModel = require("../model/jobModel");
const QuestionModel = require("../model/questionModel");
const { getTopScorer } = require("../model/testScoreModel");
const SelectedModel = require("../model/selectedModel");
const TestScoreModel = require("../model/testScoreModel");

router.post("/createJob", CompanyModel.createJob);
router.post("/getAllJobsByCompanyId", CompanyModel.getAllJobsByCompanyId);
router.post("/publishEligible", JobModel.publishEligible);
router.post("/updateCgpaReq", JobModel.updateCgpaReq);

router.post("/uploadQuestion", QuestionModel.uploadQuestion);
router.post("/getTopScorer", TestScoreModel.getTopScorer);
router.post("/getSelectedStudent", SelectedModel.getSelectedStudent);

module.exports = router;
