const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema
const selectedSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true }
});

// Static method to find students by jobId
selectedSchema.statics.getSelectedStudent = async (req, res, next) => {
  try {
    const { jobId } = req.body;
    const students = await SelectedModel.find({ jobId }).populate('studentId').exec();
    res.status(200).send(students);
  } catch (error) {
    next(error);
  }
};

selectedSchema.statics.getSelectedCompany = async (req, res, next) => {
  try {
    const { studentId } = req.body;
    const jobs = await SelectedModel.find({ studentId }).populate('jobId').exec();
    res.status(200).send(jobs);
  } catch (error) {
    next(error);
  }
};

// Create the model
const SelectedModel = mongoose.model('Selected', selectedSchema);

module.exports = SelectedModel;
