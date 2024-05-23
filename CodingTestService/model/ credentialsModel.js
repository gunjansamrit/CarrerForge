const db = require('../dbConnection');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { generatePasswordHash, verifyPassword } = require('../utils/passwordHash'); // Import the verifyPassword utility function
const StudentModel = require('./studentModel');
const TestSelectedModel = require('./testSelectedModel');

const credentialsSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Company', 'Student', 'Admin'], required: true }
});

credentialsSchema.statics.checkEligibility = async (req, res) => {
  const { username, password, job, company, role } = req.body;
  console.log(req.body);

  try {
    const credentials = await CredentialsModel.findOne({ username, role }); // Find credentials by username and role
    if (!credentials) {
      return res.status(400).send({ message: 'Invalid User Name' });
    }

    const isMatch = await verifyPassword(password, credentials.password); // Verify the password
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid Password' });
    }

    // Step 2: Retrieve student ID using the credentials ID
    const student = await StudentModel.findOne({ credentials: credentials._id });
    if (!student) {
      return res.status(400).send({ message: 'Student not found' });
    }

    // Step 3: Check if the student ID and job ID are present in the TestSelectedModel
    const testSelected = await TestSelectedModel.findOne({ studentId: student._id, jobId: job });
    
   
    if (!testSelected) {
      return res.status(400).send({ message: 'You are not eligible for this test' });
    }

    // Step 4: Check the attempt field
    if (testSelected.attempt) {
      return res.status(400).send({ message: 'Already Attempted' });
    }
   

    // If all checks pass and attempt is false, return the student ID with a success status
    res.status(200).send({ studentId: student._id });
  } catch (error) {
    console.error('Error checking eligibility:', error);
    res.status(500).send({ message: 'Error checking eligibility' });
  }
};

const CredentialsModel = mongoose.model('Credentials', credentialsSchema);

module.exports = CredentialsModel;
