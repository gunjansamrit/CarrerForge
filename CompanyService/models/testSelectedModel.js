const mongoose = require('mongoose');
const { Schema } = mongoose;

const testSelectedSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true }
});

const TestSelectedModel = mongoose.model('TestSelected', testSelectedSchema);

module.exports = TestSelectedModel;
