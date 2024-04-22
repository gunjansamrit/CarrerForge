import React, { createContext, useState } from 'react';

const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [jobId, setJobId] = useState(''); // Initialize jobId with an empty string
  const [questionText, setQuestionText] = useState('');
  const [javaCode, setJavaCode] = useState('');
  const [cppCode, setCppCode] = useState('');
  const [pythonCode, setPythonCode] = useState('');
  const [sampleTestCase, setSampleTestCase] = useState([]);
  const [questionId, setQuestionId] = useState('');
  const [codeChanges, setCodeChanges] = useState({});



  return (
    <QuestionContext.Provider value={{ 
      showQuestion, setShowQuestion, 
      jobId, setJobId, 
      questionText, setQuestionText, 
      javaCode, setJavaCode, 
      cppCode, setCppCode, 
      pythonCode, setPythonCode, 
      sampleTestCase, setSampleTestCase ,
      questionId,setQuestionId,
      codeChanges, setCodeChanges,

    }}>
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionContext, QuestionProvider };
