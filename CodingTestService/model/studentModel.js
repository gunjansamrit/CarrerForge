const { generateToken,verifyToken } = require('../utils/jwtToken'); // Import the generateToken utility function
const CredentialsModel = require('./ credentialsModel');
const JobModel =require('./jobModel')
// const ApplicationModel =require('./applicationModel')
const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true }
  },
  email: { type: String, required: true, unique: true },
  contactNumber: String,
  cgpa: Number,
  highestEducation: String,
  credentials: { type: Schema.Types.ObjectId, ref: 'Credentials', required: true }
});






const StudentModel = mongoose.model('Student', studentSchema);

module.exports = StudentModel;
