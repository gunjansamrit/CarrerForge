const express =require("express");
const router =express.Router();
// const CompanyModel=require("../models/companyModel")
// const JobModel=require("../model/");
const QuestionModel = require("../model/questionModel");
const TestScoreModel = require("../model/testScoreModel");



router.post('/uploadQuestion',QuestionModel.uploadQuestion);
router.get('/getTopScorer', TestScoreModel.getTopScorer);



module.exports=router;