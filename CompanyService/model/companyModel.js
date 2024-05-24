const mongoose = require("mongoose");
const { Schema } = mongoose;
const CredentialsModel = require("./credentialsModel");
const JobModel = require("./jobModel");
// const { verifyPassword } = require('../utils/passwordHash'); // Import the verifyPassword utility function
const { generateToken, verifyToken } = require("../utils/jwtToken");

const companySchema = new Schema({
  companyName: { type: String, required: true },
  contactEmail: { type: String, required: true, unique: true },
  companyCity: String,
  credentials: {
    type: Schema.Types.ObjectId,
    ref: "Credentials",
    required: true,
  }, // Reference to CredentialsModel
});

companySchema.statics.createJob = async (req, res, next) => {
  const { companyId, jobData } = req.body;

  try {
    const job = await JobModel.create({
      companyId,
      jobTitle: jobData.jobTitle,
      description: jobData.description,
      degreeReq: jobData.degreeReq,
      cgpaReq: jobData.cgpaReq,
    });

    res.status(200).send("Job Publish Successful");
  } catch (error) {
    throw new Error("Failed to create job: " + error.message);
    next(error);
  }
};

companySchema.statics.getAllJobsByCompanyId = async function (req, res, next) {
  const { companyId } = req.body;

  try {
    const jobs = await JobModel.find({ companyId })
      .sort({ createdAt: "desc" })
      .exec();
    res.status(200).send(jobs);
  } catch (error) {
    next(error);
  }
};

const CompanyModel = mongoose.model("Company", companySchema);

module.exports = CompanyModel;
