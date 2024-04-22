const db=require('../dbConnection')
const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  jobTitle: { type: String, required: true },
  description: String,
  degreeReq: String,
  cgpaReq: Number
});

const JobModel = mongoose.model('Job', jobSchema);

module.exports = JobModel;