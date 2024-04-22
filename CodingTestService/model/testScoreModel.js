const mongoose = require('mongoose');
const { Schema } = mongoose;

const testScoreSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true }, // Reference to the Student model
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true ,unique:true}, // Reference to the Job model
    questionScores: [
      {
        questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true }, // Reference to the Question model
        score: { type: Number, required: true },
      },
    ],
    totalScore: { type: Number, default: 0 }, // Default total score is 0
    // Add other fields related to the test score
  });

  testScoreSchema.statics.getTopScorer = async (req,res,nexxt) =>{

    const{jobId,criteria}= req.query;
    try {
        const students = await this.aggregate([
            { $match: { jobId: mongoose.Types.ObjectId(jobId) } }, // Match documents with the given jobId
            {
                $group: {
                    _id: '$student', // Group by student
                    totalScore: { $sum: '$totalScore' }, // Calculate the total score for each student based on totalScore field
                },
            },
            { $sort: { totalScore: -1 } }, // Sort students by total score in descending order
            { $limit: criteria }, // Limit the result to the specified criteria
        ]);

        // Find the minimum score among the top scorers
        const minScore = students[students.length - 1].totalScore;

        // Find all students with a total score greater than or equal to the minScore
        const topScorers = await this.find({
            jobId: mongoose.Types.ObjectId(jobId),
            totalScore: { $gte: minScore },
        }).populate('student', 'name email'); // Populate student details

        return { minScore, topScorers };
    } catch (error) {
        throw new Error('Failed to get top scorer: ' + error.message);
    }
};





const TestScoreModel = mongoose.model('TestScore', testScoreSchema);

module.exports = TestScoreModel;
