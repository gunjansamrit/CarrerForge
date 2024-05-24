// const db = require("../dbConnection");
// const mongoose = require("mongoose");

// const { Schema } = mongoose;

// const applicationSchema = new Schema({
//   jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
//   studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
//   status: {
//     type: String,
//     enum: ["Submitted", "In Review", "Rejected"],
//     required: true,
//   },
//   applicationDate: { type: Date, default: Date.now },
// });

// // Static method to fetch all applications for a student along with corresponding job details
// applicationSchema.statics.findAllApplicationsWithJobDetails = async (
//   req,
//   res,
//   next
// ) => {
//   const { studentId } = req.body;
//   try {
//     // Find all applications for the given student
//     const applications = await ApplicationModel.find({ studentId });

//     if (!applications.length) {
//       res
//         .status(404)
//         .send({ message: "No applications found for the student ID" });
//     }

//     // Array to store results with job details
//     const results = [];

//     // Loop through each application to retrieve job details
//     const JobModel = require("./jobModel");
//     for (const application of applications) {
//       // Find the job details using JobModel for the jobId in the application
//       const job = await JobModel.findById(application.jobId);

//       if (!job) {
//         return res.status(404).send({ message: "No job found for the Job ID" });
//       }

//       // Push object with application and job details to results array
//       results.push({ application, job });
//     }

//     // Return the array of results with application and job details
//     return res.status(200).send(results);
//   } catch (error) {
//     return res
//       .status(500)
//       .send({
//         message: "Error while finding application",
//         error: error.message,
//       });
//   }
// };

// const ApplicationModel = mongoose.model("Application", applicationSchema);

// module.exports = ApplicationModel;
const db = require("../dbConnection");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const applicationSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  status: {
    type: String,
    enum: ["Submitted", "In Review", "Rejected"],
    required: true,
  },
  applicationDate: { type: Date, default: Date.now },
});

// Static method to fetch all applications for a student along with corresponding job and company details
applicationSchema.statics.findAllApplicationsWithJobDetails = async (
  req,
  res,
  next
) => {
  const { studentId } = req.body;
  try {
    // Find all applications for the given student
    const applications = await ApplicationModel.find({ studentId });

    if (!applications.length) {
      return res
        .status(404)
        .send({ message: "No applications found for the student ID" });
    }

    // Array to store results with job and company details
    const results = [];

    const JobModel = require("./jobModel");
    const CompanyModel = require("./companyModel");

    for (const application of applications) {
      // Find the job details using JobModel for the jobId in the application
      const job = await JobModel.findById(application.jobId).populate(
        "companyId"
      );

      if (!job) {
        return res.status(404).send({ message: "No job found for the Job ID" });
      }

      // Find the company details using CompanyModel for the companyId in the job
      const company = await CompanyModel.findById(job.companyId);

      if (!company) {
        return res
          .status(404)
          .send({ message: "No company found for the Company ID" });
      }

      // Push object with application, job, and company details to results array
      results.push({
        application,
        job,
        companyId: job.companyId,
        companyName: company.companyName,
      });
    }

    // Return the array of results with application, job, and company details
    return res.status(200).send(results);
  } catch (error) {
    return res
      .status(500)
      .send({
        message: "Error while finding applications",
        error: error.message,
      });
  }
};

const ApplicationModel = mongoose.model("Application", applicationSchema);

module.exports = ApplicationModel;
