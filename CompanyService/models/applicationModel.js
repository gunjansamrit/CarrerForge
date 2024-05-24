
const db=require('../dbConnection')
const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  status: { type: String, enum: ['Submitted', 'In Review', 'Rejected'], required: true },
  applicationDate: { type: Date, default: Date.now }
});

// Static method to fetch all applications for a student along with corresponding job details
applicationSchema.statics.findAllApplicationsWithJobDetails = async (req,res,next) =>{

  const{studentId}= req.body;
  try {
    // Find all applications for the given student
    const applications = await this.find({ studentId });

    if (!applications.length) {
      throw new Error('No applications found for the student ID');
    }

    // Array to store results with job details
    const results = [];

    // Loop through each application to retrieve job details
    for (const application of applications) {
      // Find the job details using JobModel for the jobId in the application
      const job = await JobModel.findById(application.jobId);

      if (!job) {
        throw new Error('Job not found for application ID: ' + application._id);
      }

      // Push object with application and job details to results array
      results.push({ application, job });
    }

    // Return the array of results with application and job details
    return results;
  } catch (error) {
    throw new Error('Failed to find applications with job details: ' + error.message);
  }
};




const ApplicationModel = mongoose.model('Application', applicationSchema);

module.exports = ApplicationModel;