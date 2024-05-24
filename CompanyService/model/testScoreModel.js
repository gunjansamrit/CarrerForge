const mongoose = require('mongoose');
const { Schema } = mongoose;
const SelectedModel = require('./selectedModel'); // Adjust the path as necessary

const testScoreSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true, unique: true },
    questionScores: [
        {
            questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
            score: { type: Number, required: true },
        },
    ],
    totalScore: { type: Number, default: 0 },
});

testScoreSchema.statics.getTopScorer = async function(req, res, next) {
    const { jobId, criteria } = req.body;
    console.log(req.body);

    try {
        const students = await TestScoreModel.aggregate([
            { $match: { jobId: new mongoose.Types.ObjectId(jobId) } },
            {
                $group: {
                    _id: '$student',
                    totalScore: { $sum: '$totalScore' },
                },
            },
            { $sort: { totalScore: -1 } },
            { $limit: parseInt(criteria, 10) },
        ]);

        if (students.length === 0) {
            return res.status(404).send({ message: 'No students found' });
        }

        const minScore = students[students.length - 1].totalScore;

        const topScorers = await TestScoreModel.find({
            jobId: new mongoose.Types.ObjectId(jobId),
            totalScore: { $gte: minScore },
        }).populate('student', 'name email');

        const selectedEntries = topScorers.map(topScorer => ({
            jobId: new mongoose.Types.ObjectId(jobId),
            studentId: topScorer.student._id,
        }));

        await SelectedModel.insertMany(selectedEntries);

        res.status(200).send({ minScore, topScorers });
    } catch (error) {
        next(new Error('Failed to get top scorer: ' + error.message));
    }
};

const TestScoreModel = mongoose.model('TestScore', testScoreSchema);

module.exports = TestScoreModel;
