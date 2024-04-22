const express = require("express");
const router = express.Router();
const StudentModel = require("../model/studentModel");

router.post('/signup', StudentModel.signup);
router.post('/login', StudentModel.login);

module.exports = router; // Corrected export statement
