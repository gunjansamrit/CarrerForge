const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  jobTitle: { type: String, required: true },
  description: String,
  degreeReq: String,
  cgpaReq: Number,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
  applications: [{ type: Schema.Types.ObjectId, ref: 'Application' }]
});

// Define a static method to fetch job profiles by company ID
jobSchema.statics.getJobProfilesByCompanyId = async function(req, res, next) { // Note the change to function syntax
  const { selectedCompanyId } = req.body;
 

  try {
    if (!selectedCompanyId) {
      return res.status(400).send({ message: 'Missing selectedCompanyId parameter' });
    }

    const jobs = await JobModel.find({ companyId: selectedCompanyId }, { _id: 1, jobTitle: 1 });


    // Explicitly handle the case where no jobs are found
    if (jobs.length === 0) {
      return res.status(200).send([]);
    }

    res.status(200).send(jobs);
  } catch (error) {
    console.error('Error fetching job profiles:', error);
    res.status(500).send({ message: 'Error fetching job profiles' });
  }
};

const JobModel = mongoose.model('Job', jobSchema);

module.exports = JobModel;
