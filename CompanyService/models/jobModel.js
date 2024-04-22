const db=require('../dbConnection')
const mongoose = require('mongoose');
const companySchema = require('./companyModel');
const { Schema } = mongoose;
const ApplicationModel = require('./applicationModel');
const TestSelectedModel = require('./testSelectedModel');

const jobSchema = new Schema({
  companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  jobTitle: { type: String, required: true },
  description: String,
  degreeReq: String,
  cgpaReq: Number,
  createdAt: { type: Date, default: Date.now } ,
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' } ,// Add status field with default value 'Open'
  applications: [{ type: Schema.Types.ObjectId, ref: 'Application' }] // Array of application IDs

});

jobSchema.statics.publishEligible = async function (jobId) {
  try {
    // Find the job by ID and populate its applications
    const job = await this.findById(jobId).populate('applications');

    if (!job) {
      throw new Error('Job not found');
    }

    // Iterate through each application for the job
    for (const application of job.applications) {
      const { studentId } = application;

      // Check if the student meets the criteria
      const student = await StudentModel.findById(studentId);
      if (!student) {
        throw new Error('Student not found');
      }

      if (
        student.highestEducation === job.degreeReq &&
        student.cgpa >= job.cgpaReq
      ) {
        // Update the application status to 'Submitted' if criteria are met
        await ApplicationModel.findByIdAndUpdate(
          application._id,
          { status: 'Submitted' },
          { new: true }
        );
      } else {
        // Update the application status to 'Rejected' if criteria are not met
        await ApplicationModel.findByIdAndUpdate(
          application._id,
          { status: 'Rejected' },
          { new: true }
        );
      }
    }

    // Store submitted applications in the Test collection
    const submittedApplications = job.applications.filter(
      (application) => application.status === 'Submitted'
    );

    // Code to store submitted applications in the Test collection
    // Assuming there's a TestModel defined elsewhere in your code
    // Replace 'TestModel' with the actual model name and modify the code accordingly
    for (const application of submittedApplications) {
      await TestSelectedModel.create({
        jobId: job._id,
        studentId: application.studentId,
        applicationId: application._id
      });
    }
    await this.findByIdAndUpdate(jobId, { status: 'Closed' });


    return 'Eligible applications published successfully';
  } catch (error) {
    throw new Error('Failed to publish eligible applications: ' + error.message);
  }
};
// changeCgpa jobId cgpa

const JobModel = mongoose.model('Job', jobSchema);

module.exports = JobModel;