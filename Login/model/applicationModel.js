
const db=require('../dbConnection')
const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  status: { type: String, enum: ['Submitted', 'In Review', 'Rejected'], required: true },
  applicationDate: { type: Date, default: Date.now }
});

const ApplicationModel = mongoose.model('Application', applicationSchema);

module.exports = ApplicationModel;