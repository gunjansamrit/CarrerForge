const db=require('../dbConnection')
const mongoose = require('mongoose');
const { Schema } = mongoose;

const selectedSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true }
});

const SelectedModel = mongoose.model('Selected', selectedSchema);

module.exports = SelectedModel;