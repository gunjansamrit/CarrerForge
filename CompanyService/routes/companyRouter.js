const express =require("express");
const router =express.Router();
const CompanyModel=require("../models/companyModel")
const JobModel=require("../models/jobModel")


router.post('/createJob',CompanyModel.createJob);
router.post('/getAllJobsByCompanyId',CompanyModel.getAllJobsByCompanyId);
router.post('/publishEligible',JobModel.publishEligible);


module.exports=router;