import React, { useRef, useState, useContext, useEffect } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import { QuestionContext } from './QuestionContext';

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("java");
  const { showQuestion, questionText, javaCode, cppCode, pythonCode, sampleTestCase, questionId, setQuestionId, codeChanges, setCodeChanges } = useContext(QuestionContext);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  
    // Check if code changes are available for the selected question and language
    const codeChangesAvailable =
      codeChanges &&
      codeChanges[questionId] &&
      codeChanges[questionId][selectedLanguage];
  
    // If code changes are available, update the code based on the changes
    if (codeChangesAvailable) {
      setValue(codeChanges[questionId][selectedLanguage]);
    } else {
      // If no code changes available, set the code based on default values
      setValue(getCodeSnippet(selectedLanguage));
    }
  };

  useEffect(() => {
    if (questionId && codeChanges && codeChanges[questionId]) {
      // Check if the selected language is present in codeChanges[questionId]
      if (language in codeChanges[questionId]) {
        // If the selected language is present, set it as the current language
        setLanguage(language);
        setValue(codeChanges[questionId][language]);
      } else {
        setLanguage(language); // Default to the selected language
        setValue(getCodeSnippet(language));
      }
    } else {
      // Set default language and code if questionId or codeChanges is not present
      setLanguage(language); // Default to the selected language
      setValue(getCodeSnippet(language)); // Set default code based on the selected language
    }
  }, [questionId, codeChanges, language]);
  
  

  const onChange = (newValue) => {
    setValue(newValue);
  
    // Update codeChanges state with the new value for the selected question and language
    setCodeChanges((prevCodeChanges) => ({
      ...prevCodeChanges,
      [questionId]: {
        ...prevCodeChanges[questionId],
        [language]: newValue,
      },
    }));
  };

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

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={getCodeSnippet(language)}
            onMount={onMount}
            value={value}
            onChange={onChange}
          />
        </Box>
        <Output
          editorRef={editorRef}
          language={language}
          showQuestion={showQuestion}
          questionText={questionText}
          sampleTestCase={sampleTestCase}
          questionId={questionId}
        />
      </HStack>
    </Box>
  );
};

export default CodeEditor;
