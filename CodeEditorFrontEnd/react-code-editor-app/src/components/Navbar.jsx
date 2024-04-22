import React, { useContext, useState, useEffect } from 'react';
import { QuestionContext } from './QuestionContext';
import axios from 'axios'; // Import Axios
import './Navbar.css';

const Navbar = () => {
  const { 
    showQuestion, setShowQuestion, 
    jobId, setJobId, // Include jobId in the useContext
    setQuestionText, setJavaCode, 
    setCppCode, setPythonCode, 
    setSampleTestCase ,questionId, setQuestionId,setCodeChanges 
  } = useContext(QuestionContext);
  const [questions, setQuestions] = useState([]); // State to hold the fetched questions
  const [activeIndex, setActiveIndex] = useState(null); // State to store the active button index

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post("http://localhost:3003/student/getAllQuestions", {
          jobId: "661c0eee1d9a265158dd5702" // Replace with your actual jobId
        });

        if (response.status === 200) {
          setQuestions(response.data); // Update state with fetched questions
          console.log(response.data); // Log the fetched data
        } else {
          throw new Error("Failed to fetch questions.");
        }
      } catch (error) {
        console.error(error);
        // Handle error if necessary
      }
    };

    fetchQuestions(); // Call the fetchQuestions function when the component mounts
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

  const handleQuestionClick = (question, index) => {
    if (activeIndex === index) {
      // Toggle showQuestion if clicking the same active button
      setShowQuestion(!showQuestion);
    } else {
      // Set showQuestion to true for different button clicks
      setShowQuestion(true);
      setActiveIndex(index);
    }

    setQuestionId(question._id);
    setJobId(question.jobId);
    setQuestionText(question.questionText);
    setJavaCode(question.javaCode);
    setCppCode(question.cppCode);
    setPythonCode(question.pythonCode);
    setSampleTestCase(question.sampleTestCase);

    // Check if code changes are available for the selected question and language
    
  };

  return (
    <div className="navbar">
      <h1>CareerForge</h1>
     
      <div className='questions'>
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => handleQuestionClick(question, index)}
            className={activeIndex === index ? 'active' : ''}
          >
            {`Question ${index+1}`} 
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
