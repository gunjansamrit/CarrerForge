const express =require("express");
const router =express.Router();
const adminModel=require("../model/adminModel")






router.post('/registercompany',adminModel.authMiddleware,adminModel.registerCompany)


module.exports= router;