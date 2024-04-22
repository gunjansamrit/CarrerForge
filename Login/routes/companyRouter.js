const express =require("express");
const router =express.Router();
const companyModel=require("../model/companyModel")


router.get('/login',companyModel.login);


module.exports=router;