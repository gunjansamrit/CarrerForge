const express =require("express");
const router =express.Router();
const adminModel=require("../model/adminModel")

router.post('/signup',adminModel.signup);


router.post('/login',adminModel.login);




module.exports= router;