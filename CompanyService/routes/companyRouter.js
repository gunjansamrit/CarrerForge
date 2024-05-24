const express = require("express");
const router = express.Router();
const CompanyModel = require("../models/companyModel");
const JobModel = require("../models/jobModel");
const QuestionModel = require("../models/questionModel");
const { getTopScorer } = require("../models/testScoreModel");

router.post('/createJob', CompanyModel.createJob);
router.post('/getAllJobsByCompanyId', CompanyModel.getAllJobsByCompanyId);
router.post('/publishEligible', JobModel.publishEligible);
router.post('/updateCgpaReq', JobModel.updateCgpaReq);

router.post('/uploadQuestion', QuestionModel.uploadQuestion);
router.post('/getTopScorer', getTopScorer);

module.exports = router;
