const { PythonShell } = require('python-shell');
const mongoose = require('mongoose');
const fs = require('fs');
const QuestionModel = require('./questionModel');
const { Schema } = mongoose;
const java = require('java');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const path = require('path');
const TestScoreModel = require('./testScoreModel');
  


const userSolutionSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  solutionCode: { type: String, required: true },
});

userSolutionSchema.statics.pythonTestSubmit = async (req, res, next) => {
    const { questionId, solutionCode } = req.body;
  
    try {
      const question = await QuestionModel.findById(questionId);
      const testCases = question.testCases;
      const jobId = question.jobId;
      const studentId=solutionCode.studentId;
  
      fs.writeFileSync('clientCode.py', solutionCode.solutionCode);
  
      const results = [];
      let passCount = 0;
  
      for (const testCase of testCases) {
        const inputArray = testCase.input.split(' ').map(Number);
       
  
        // Run the Python script with input arguments
        const { stdout, stderr } = await execAsync(`python3 clientCode.py ${inputArray.join(' ')}`);
  
        if (stderr) {
          console.error('Python execution error:', stderr);
          results.push({
            input: testCase.input,
            expectedOutput: testCase.output,
            yourOutput: '',
            status: 'Runtime Error',
            error: stderr,
          });
        } else if (stdout.trim() === testCase.output.trim()) {
          results.push({
            input: testCase.input,
            expectedOutput: testCase.output,
            yourOutput: stdout.trim(),
            status: 'Passed',
          });
          passCount++;
        } else {
          results.push({
            input: testCase.input,
            expectedOutput: testCase.output,
            yourOutput: stdout.trim(),
            status: 'Failed',
          });
        }
      }
      let testScore = await TestScoreModel.findOne({ student: studentId, jobId: jobId });
      if (!testScore) {
          // If the test score does not exist, create a new entry
          testScore = await TestScoreModel.create({
              student: studentId,
              jobId: jobId,
              questionScores: [{ questionId: questionId, score: passCount }],
              totalScore: passCount,
          });
      } else {
          // Check if the questionId is already present in the questionScores
          const existingQuestionScore = testScore.questionScores.find(score => score.questionId.toString() === questionId);
          if (existingQuestionScore) {
              // If the questionId is present, update its score
              existingQuestionScore.score = passCount;
          } else {
              // If the questionId is not present, add it to questionScores
              testScore.questionScores.push({ questionId: questionId, score: passCount });
          }

          // Update the totalScore as the sum of all question scores
          testScore.totalScore = testScore.questionScores.reduce((sum, score) => sum + score.score, 0);

          await testScore.save();
      }
  
      console.log('Total pass count:', passCount);
      res.status(200).send(JSON.stringify(results));
    } catch (error) {
      console.error('Failed to run Python test:', error.message);
      res.status(200).send(JSON.stringify([{ input: '', expectedOutput: '', yourOutput: '', status: 'Runtime Error', error: error.message }]));
    }
  };



userSolutionSchema.statics.javaTestSubmit = async (req, res, next) => {
    const { questionId, solutionCode } = req.body;
  
    try {
      const question = await QuestionModel.findById(questionId);
      const TestCases = question.testCases;
    //   console.log(TestCases);
      const studentId=solutionCode.studentId;
      const jobId = question.jobId;


      fs.writeFileSync('Main.java', solutionCode.solutionCode);
  
      // Compile the Java code
      const { stdout: compileOutput, stderr: compileError } = await execAsync('javac Main.java');
  
      if (compileError) {
        console.error('Java compilation error:', compileError);
        res.status(200).send(JSON.stringify([{ input: '', expectedOutput: '', yourOutput: '', status: 'Compilation Error', compilationError: compileError }]));
        return; // Abort further processing
      }
  
      const results = [];
      let passCount = 0;
  
      for (const testCase of TestCases) {
        const inputArray = testCase.input.split(' ').map(Number);
  
        // Run the compiled Java class with input arguments
        const { stdout: javaOutput } = await execAsync(`java Main ${inputArray.join(' ')}`);
  
        let result = 'Failed';
        if (javaOutput.trim().toString() === testCase.output.toString()) {
          result = 'Passed';
          passCount++;
        }
        
  
        results.push({
          input: testCase.input,
          expectedOutput: testCase.output,
          yourOutput: javaOutput.trim(),
          status: result
        });
      }
      console.log(results);
      let testScore = await TestScoreModel.findOne({ student: studentId, jobId: jobId });
      if (!testScore) {
          // If the test score does not exist, create a new entry
          testScore = await TestScoreModel.create({
              student: studentId,
              jobId: jobId,
              questionScores: [{ questionId: questionId, score: passCount }],
              totalScore: passCount,
          });
      } else {
          // Check if the questionId is already present in the questionScores
          const existingQuestionScore = testScore.questionScores.find(score => score.questionId.toString() === questionId);
          if (existingQuestionScore) {
              // If the questionId is present, update its score
              existingQuestionScore.score = passCount;
          } else {
              // If the questionId is not present, add it to questionScores
              testScore.questionScores.push({ questionId: questionId, score: passCount });
          }

          // Update the totalScore as the sum of all question scores
          testScore.totalScore = testScore.questionScores.reduce((sum, score) => sum + score.score, 0);

          await testScore.save();
      }

  
      res.status(200).send(JSON.stringify(results));
    } catch (error) {
      console.error('Failed to run Java test:', error.message);
      res.status(200).send(JSON.stringify([{ input: '', expectedOutput: '', yourOutput: '', status: 'Compilation Error', error: error.message }]));
    }
  };

userSolutionSchema.statics.cppTestSubmit = async (req, res, next) => {
    const { questionId, solutionCode } = req.body;
  
    try {
      const question = await QuestionModel.findById(questionId);
      const testCases = question.testCases;
      const studentId=solutionCode.studentId;
      const jobId = question.jobId;


      console.log(testCases);
  
      fs.writeFileSync('Main.cpp', solutionCode.solutionCode);
  
      // Compile the C++ code
      const { stdout: compileOutput, stderr: compileError } = await execAsync('g++ Main.cpp -o Main');
  
      if (compileError) {
        console.error('Cpp compilation error:', compileError);
        res.status(200).send(JSON.stringify([{ input: '', expectedOutput: '', yourOutput: '', status: 'Compilation Error', compilationError: compileError }]));
        return; // Abort further processing
      }
  
      const results = [];
      let passCount = 0;
  
      for (const testCase of testCases) {
        const inputArray = testCase.input.split(' ').map(Number);
        console.log('Input Array:', inputArray);
  
        // Run the compiled C++ program with input arguments
        const { stdout: cppOutput } = await execAsync(`./Main ${inputArray.join(' ')}`);
        console.log('C++ output:', cppOutput.trim());

        let result = 'Failed';
        if (cppOutput.trim().toString() === testCase.output.toString()) {
          passCount++;
          result="Passed"
        }
        results.push({
            input: testCase.input,
            expectedOutput: testCase.output,
            yourOutput: cppOutput.trim(),
            status: result
          });
      }
      let testScore = await TestScoreModel.findOne({ student: studentId, jobId: jobId });
      if (!testScore) {
          // If the test score does not exist, create a new entry
          testScore = await TestScoreModel.create({
              student: studentId,
              jobId: jobId,
              questionScores: [{ questionId: questionId, score: passCount }],
              totalScore: passCount,
          });
      } else {
          // Check if the questionId is already present in the questionScores
          const existingQuestionScore = testScore.questionScores.find(score => score.questionId.toString() === questionId);
          if (existingQuestionScore) {
              // If the questionId is present, update its score
              existingQuestionScore.score = passCount;
          } else {
              // If the questionId is not present, add it to questionScores
              testScore.questionScores.push({ questionId: questionId, score: passCount });
          }

          // Update the totalScore as the sum of all question scores
          testScore.totalScore = testScore.questionScores.reduce((sum, score) => sum + score.score, 0);

          await testScore.save();
      }

  
      
     
  
      console.log('Total pass count:', passCount);
     res.status(200).send(results);
    } catch (error) {
     console.log('Failed to run C++ test: ' + error.message);
      res.status(200).send(JSON.stringify([{ input: '', expectedOutput: '', yourOutput: '', status: 'Compilation Error', error: error.message }]));

    }
  };

  userSolutionSchema.statics.pythonTest = async (req, res, next) => {
    const { questionId, solutionCode } = req.body;
  
    try {
      const question = await QuestionModel.findById(questionId);
      const sampleTestCases = question.sampleTestCase; // Assuming sampleTestCase is an array of objects
      const results = [];
  
      for (const testCase of sampleTestCases) {
        const inputArray = testCase.input.split(' ').map(Number);
  
        fs.writeFileSync('clientCode.py', solutionCode.solutionCode);
        // fs.writeFileSync('serverCode.py', testCase.questionCode);
  
        const options = {
          mode: 'text',
          pythonOptions: ['-u'], // Clear the Python shell after receiving the first output
          args: inputArray,
        };
  
        try {
          const messages = await PythonShell.run('clientCode.py', options);
          console.log('PythonShell output:', messages);
  
          let result = 'Failed';
          if (messages.toString() === testCase.output.toString()) {
            result = 'Passed';
          }
  
          results.push({ input: testCase.input, expectedOutput: testCase.output, yourOutput: messages.toString(), status: result });
        } catch (pythonError) {
          console.error('PythonShell error:', pythonError);
          results.push({ input: testCase.input, expectedOutput: testCase.output, yourOutput: '', status: 'Runtime Error', error: pythonError.message });
        }
      }
  
      console.log('Sample Test Case Results:', results);
      res.status(200).send(JSON.stringify(results)); // Send the results back as JSON string
    } catch (error) {
      res.status(200).send(JSON.stringify([{ input: '', expectedOutput: '', yourOutput: '', status: 'Execution Error', error: error.message }]));
    }
  };
  


  

  userSolutionSchema.statics.javaTest = async (req, res, next) => {
    const { questionId, solutionCode } = req.body;
    // console.log(questionId);
  
    try {
      const question = await QuestionModel.findById( questionId );
      console.log(question);
    //   const serverCode = question.questionCode;
      const sampleTestCases = question.sampleTestCase; // Assuming sampleTestCases is an array of objects
      console.log(sampleTestCases);
      fs.writeFileSync('Main.java', solutionCode.solutionCode);
      console.log(solutionCode)
  
      // Compile the Java code
      const { stdout: compileOutput, stderr: compileError } = await execAsync('javac Main.java');
  
      if (compileError) {
        console.error('Java compilation error:', compileError);
        res.status(200).send(JSON.stringify([{ input: '', expectedOutput: '', yourOutput: '', status: 'Compilation Error', compilationError: compileError }]));
        return; // Abort further processing
      }
  
      const results = [];
      let passCount = 0;
  
      for (const testCase of sampleTestCases) {
        const inputArray = testCase.input.split(' ').map(Number);
        console.log('Input Array:', inputArray);
  
        // Run the compiled Java class with input arguments
        const { stdout: javaOutput } = await execAsync(`java Main ${inputArray.join(' ')}`);
        console.log('Java output:', javaOutput.trim());
  
        let result = 'Failed';
        if (javaOutput.trim().toString()== testCase.output.toString()) {
          result = 'Passed';
          passCount++;
        }
  
        results.push({
            input: testCase.input,
            expectedOutput: testCase.output,
            yourOutput: javaOutput.trim(),
            status: result
          });      }
  
      console.log('Sample Test Cases Results:', results);
      res.status(200).send(JSON.stringify(results));
    } catch (error) {
        console.error('Failed to run Java test:', error.message);
        res.status(200).send(JSON.stringify([{ input: '', expectedOutput: '', yourOutput: '', status: 'Compilation Error', error: error.message }]));    }
  };
  

  userSolutionSchema.statics.cppTest = async (req, res, next) => {
    const { questionId, solutionCode } = req.body;
  
    try {
      const question = await QuestionModel.findById(questionId);
      const sampleTestCases = question.sampleTestCase; // Use sampleTestCase instead of testCases
  
      fs.writeFileSync('Main.cpp', solutionCode.solutionCode);
  
      // Compile the C++ code
      const { stdout: compileOutput, stderr: compileError } = await execAsync('g++ Main.cpp -o Main');
  
      if (compileError) {
        console.error('Cpp compilation error:', compileError);
        res.status(200).send(JSON.stringify([{ input: '', expectedOutput: '', yourOutput: '', status: 'Compilation Error', compilationError: compileError }]));
        return;// Abort further processing
      }
  
      const results = [];
      let passCount = 0;
  
      for (const testCase of sampleTestCases) {
        const inputArray = testCase.input.split(' ').map(Number);
        console.log('Input Array:', inputArray);
  
        // Run the compiled C++ program with input arguments
        const { stdout: cppOutput } = await execAsync(`./Main ${inputArray.join(' ')}`);
        console.log('C++ output:', cppOutput.trim());
  
        let result = 'Failed';
        if (cppOutput.trim() === testCase.output) {
          result = 'Passed';
          passCount++;
        }
  
        results.push({
            input: testCase.input,
            expectedOutput: testCase.output,
            yourOutput: cppOutput.trim(),
            status: result
          });
      }
  
      console.log('Sample Test Cases Results:', results);
      res.status(200).send(JSON.stringify(results)); // Send the results back as JSON string
    } catch (error) {
        console.log('Failed to run C++ test: ' + error.message);
        res.status(200).send(JSON.stringify([{ input: '', expectedOutput: '', yourOutput: '', status: 'Compilation Error', error: error.message }]));
  

    }
  };
  
  

const UserSolutionModel = mongoose.model('UserSolution', userSolutionSchema);
module.exports = UserSolutionModel;
