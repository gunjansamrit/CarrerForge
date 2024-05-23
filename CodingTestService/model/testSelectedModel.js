const mongoose = require('mongoose');
const { Schema } = mongoose;

const testSelectedSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
  attempt: { type: Boolean, default: false } // New field with default value false
});

// Static method to mark attempt as true
testSelectedSchema.statics.finishCode = async (req,res,next)=> {

  const{studentId,jobId} = req.body;
  try {
    const result = await TestSelectedModel.findOneAndUpdate(
      { studentId: studentId, jobId: jobId },
      { attempt: true },
      { new: true }
    );


    if (!result) {
      throw new Error('No matching document found');
    }

   req.status(200);
  } catch (error) {
    throw new Error('Failed to update attempt: ' + error.message);
  }
};

const TestSelectedModel = mongoose.model('TestSelected', testSelectedSchema);

module.exports = TestSelectedModel;
