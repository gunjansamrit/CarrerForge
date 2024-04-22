const express = require("express");
const router = express.Router();
const StudentModel = require("../models/studentModel");
const ApplicationModel = require("../models/applicationModel");

router.post('/applyForJob', StudentModel.applyForJob);
router.get('/findAllApplicationsWithJobDetails', ApplicationModel.findAllApplicationsWithJobDetails);

module.exports = router; // Corrected export statement
