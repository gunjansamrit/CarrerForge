const { generateToken, verifyToken } = require("../utils/jwtToken"); // Import the generateToken utility function
const CredentialsModel = require("./credentialsModel");

const ApplicationModel = require("./applicationModel");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true, unique: true },
  contactNumber: String,
  cgpa: Number,
  highestEducation: String,
  credentials: {
    type: Schema.Types.ObjectId,
    ref: "Credentials",
    required: true,
  },
});

studentSchema.statics.applyForJob = async (req, res, next) => {
  const { jobId, studentId } = req.body;

  try {
    // Check if the job exists
    const JobModel = require("./jobModel");
    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the student exists
    const student = await StudentModel.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Create the job application
    const application = await ApplicationModel.create({
      jobId,
      studentId,
      status: "In Review", // Initial status is submitted
    });
    await application.save();

    // Update the job's applications array with the new application ID
    job.applications.push(application._id);
    await job.save();

    res
      .status(200)
      .json({ message: "Application submitted successfully", application });
  } catch (error) {
    next(error);
  }
};

const StudentModel = mongoose.model("Student", studentSchema);

module.exports = StudentModel;
