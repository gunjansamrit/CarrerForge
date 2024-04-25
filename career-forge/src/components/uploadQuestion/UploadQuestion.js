import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import "./uploadQuestion.css";
import axios from "axios"

const UploadQuestion = () => {
  const [question, setQuestion] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [language, setLanguage] = useState("java");
  const [javaCode, setJavaCode] = useState("");
  const [cppCode, setCppCode] = useState("");
  const [pythonCode, setPythonCode] = useState("");
  const [testCaseType, setTestCaseType] = useState(false);
  const [testCases, setTestCases] = useState([{}]);
  const [sampleTestCases, setSampleTestCases] = useState([{}]);
  const [value, setValue] = useState("");
  const [codeChanges, setCodeChanges] = useState();

  const handleTestCaseType = (type) => {
    if (type === "sample") {
      setTestCaseType(true);
    } else {
      setTestCaseType(false);
    }
  };

  const editorRef = useRef();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // Function to handle language selection
  const onSelectLanguage = (lang) => {
    setLanguage(lang); // Update selected language
  };
  useEffect(() => {
    if (language === "java") {
      setValue(javaCode);
    } else if (language === "python") {
      setValue(pythonCode);
    } else {
      setValue(cppCode);
    }
  }, [cppCode, javaCode, language, pythonCode]);

  const onChange = (newValue) => {
    setValue(newValue);

    // Update the corresponding language code based on the current language
    switch (language) {
      case "java":
        setJavaCode(newValue);
        break;
      case "python":
        setPythonCode(newValue);
        break;
      case "cpp":
        setCppCode(newValue);
        break;
      default:
        break;
    }
  };

  // Function to get code snippet based on language
  const getCodeSnippet = (lang) => {
    switch (lang) {
      case "java":
        return javaCode;
      case "cpp":
        return cppCode;
      case "python":
        return pythonCode;
      default:
        return "";
    }
  };

  const toggleDropdown = (dropdownId) => {
    const dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle("show");
  };

  const closeDropdown = () => {
    const dropdowns = document.querySelectorAll(".dropdown-content");
    dropdowns.forEach((dropdown) => {
      if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
      }
    });
  };

  // Close dropdown when clicking outside the dropdown content
  window.onclick = (event) => {
    if (!event.target.matches(".dropdown-toggle")) {
      closeDropdown();
    }
  };

  const handleSubmitTestCases = (caseType) => {
    if (!input || !output || !explanation) {
        alert("Please fill in all fields: Input, Output, and Explanation.");
        return;
      }
    const newTestCase = {
      input,
      output,
      explanation,
    };
    if (caseType === "sample") {
      const updatedSampleTestCases = [...sampleTestCases, newTestCase];
      setSampleTestCases(updatedSampleTestCases);
      setTestCaseType("sample");
    } else {
      const updatedTestCases = [...testCases, newTestCase];
      setTestCases(updatedTestCases);
      setTestCaseType("test");
    }
    setInput("");
  setOutput("");
  setExplanation("");
    console.log("Test cases submitted!");
  };

  const handleSubmitCode = async () => {
    if (!question || !javaCode || !cppCode || !pythonCode || !input || !output || !explanation) {
        alert("Please fill in all fields: Question, Code, Input, Output, and Explanation.");
        return;
      }
    const dataToSend = {
        jobId: "60f5a57f39bece0a70c97f6d",
        questionText: question,
        javaCode: javaCode,
        cppCode: cppCode,
        pythonCode: pythonCode,
        testCases: testCases,
        sampleTestCases: sampleTestCases,
      };
      console.log(dataToSend);
      try {
        const response = await axios.post("http://localhost:3003/company/uploadQuestion", dataToSend);
      
      if (response.status === 200) { setQuestion("");
      setJavaCode("");
      setCppCode("");
      setPythonCode("");
      setTestCases([{}]);
      setSampleTestCases([{}]);
      setInput("");
      setOutput("");
      setExplanation("");

                     
        console.log(response.data); // Log the fetched data
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      // Handle error if necessary
    }


    console.log("Code submitted!");
  };

  return (
    <div className="main-container">
      <div className="left-column">
        <h2>Question:</h2>
        <div className="question-text">
          <textarea
            className="question-text-area"
            placeholder="Enter your question text here..."
            rows={5}
            cols={40}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => toggleDropdown("languageDropdown")}
          >
            Language: {language}
          </button>
          <div id="languageDropdown" className="dropdown-content">
            <button onClick={() => onSelectLanguage("java")}>Java</button>
            <button onClick={() => onSelectLanguage("cpp")}>C++</button>
            <button onClick={() => onSelectLanguage("python")}>Python</button>
          </div>
        </div>

        <div className="editor-content" style={{ height: "61vh" }}>
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="61vh"
            theme="vs-dark"
            language={language}
            onMount={onMount}
            defaultValue={getCodeSnippet(language)}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="right-column">
        <div className="dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => toggleDropdown("testCaseDropdown")}
          >
            {testCaseType === "sample" ? "Sample Test Case" : "Test Cases"}
          </button>
          <div id="testCaseDropdown" className="dropdown-content">
            <button onClick={() => handleSubmitTestCases("sample")}>
              Sample Test Case
            </button>
            <button onClick={() => handleSubmitTestCases("test")}>
              Test Case
            </button>
          </div>
        </div>
        <h2>Input:</h2>
        <div className="input-div">
          <textarea
            className="input-textarea"
            placeholder="Input"
            rows={5}
            cols={40}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <h2>Output:</h2>
        <div className="output-div">
          <textarea
            className="output-textarea"
            placeholder="Output"
            rows={5}
            cols={40}
            value={output}
            onChange={(e) => setOutput(e.target.value)}
          />
        </div>
        <h2>Explanation:</h2>
        <div className="explanation-div">
          <textarea
            className="explanation-textarea"
            placeholder="Explanation"
            rows={5}
            cols={40}
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </div>

        <button className="submit-button" onClick={handleSubmitTestCases}>
          Submit Test Cases
        </button>
        <button className="submit-button" onClick={handleSubmitCode}>
          Submit Code
        </button>
      </div>
    </div>
  );
};

export default UploadQuestion;
