const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true ,unique:false }, // Reference to the Job model
  questionText: { type: String, required: true },
  javaCode: { type: String, required: true }, // Java code field
  cppCode: { type: String, required: true }, // C++ code field
  pythonCode: { type: String, required: true }, // Python code field
  testCases: [{ input: String, output: String, explanation: String }], // Array of test cases
  sampleTestCase: [{ input: String, output: String, explanation: String }] // New field

  // Add other fields related to the question
});

// Define the uploadQuestion static method
questionSchema.statics.uploadQuestion = async (req, res, next) => {
  const questionData = req.body;
  
  try {
    const question = await QuestionModel.create({
      jobId: questionData.jobId,
      questionText: questionData.questionText,
      javaCode: questionData.javaCode,
      cppCode: questionData.cppCode,
      pythonCode: questionData.pythonCode,
      testCases: questionData.testCases,
      sampleTestCase: questionData.sampleTestCase,
      // Add other fields related to the question
    });
    res.status(200).send("Question Upload Successful");
  } catch (error) {
    throw new Error('Failed to upload question: ' + error.message);
  }
};
// Define the getAllQuestions static method
questionSchema.statics.getAllQuestions = async (req, res, next) => {
  const { jobId } = req.body;
 

  try {
    // Find all questions with the given jobId
    const questions = await QuestionModel.find({ jobId }).exec();

    // Check if there are multiple questions
    if (questions.length > 1) {
      // If multiple questions exist, pack them into an array and send as JSON response
      res.json(questions);
    } else if (questions.length === 1) {
      // If only one question is found, return it as a single object in an array and send as JSON response
      res.json([questions[0]]);
    } else {
      // If no questions are found, send an empty array as JSON response
      res.json([]);
    }
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: 'Failed to get questions', message: error.message });
  }
};


const QuestionModel = mongoose.model('Question', questionSchema);

module.exports = QuestionModel;
