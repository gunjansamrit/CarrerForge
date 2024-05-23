import React, { useEffect, useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import Navbar from "./Navbar"; // Import the Navbar component
import { QuestionContext } from "./QuestionContext";

const Output = ({
  editorRef,
  language,
  showQuestion,
  questionText,
  sampleTestCase,
  questionId,
  setIsAuthenticated,
}) => {
  const toast = useToast();
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [compilationError, setCompilationError] = useState("");
  const [outputMap, setOutputMap] = useState({});

  const studentId = localStorage.getItem("studentId");
  const jobId = localStorage.getItem("jobId");

  useEffect(() => {
    // Clear output when question ID changes
    setOutputMap((prevOutputMap) => ({
      ...prevOutputMap,
      [questionId]: [],
    }));
    setIsError(false);
    setIsSuccess(false);
    setCompilationError("");
  }, [questionId]);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();

    console.log(questionId);
    console.log(sourceCode);

    if (!sourceCode) {
      toast({
        title: "Error",
        description: "Source code is empty.",
        status: "error",
        duration: 6000,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3003/student/${language}Test`,
        {
          questionId: questionId,
          solutionCode: {
            studentId: studentId,
            solutionCode: sourceCode,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to run code on the server.");
      }

      const result = response.data;
      console.log(result);

      if (result.some((item) => item.status === "Compilation Error")) {
        setCompilationError(
          result.find((item) => item.status === "Compilation Error").error
        );
        setOutput([]);
        setIsSuccess(false);
        setIsError(true);
      } else {
        setCompilationError("");
        setOutput(result);
        setIsSuccess(result.some((item) => item.status === "Passed"));
        setIsError(result.some((item) => item.status !== "Passed"));
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const submitCode = async () => {
    const sourceCode = editorRef.current.getValue();

    console.log(questionId);
    console.log(sourceCode);

    if (!sourceCode) {
      toast({
        title: "Error",
        description: "Source code is empty.",
        status: "error",
        duration: 6000,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3003/student/${language}TestSubmit`,
        {
          questionId: questionId,

          solutionCode: {
            studentId: studentId,
            solutionCode: sourceCode,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to run code on the server.");
      }

      const result = response.data;
      console.log(result);

      if (result.some((item) => item.status === "Compilation Error")) {
        setCompilationError(
          result.find((item) => item.status === "Compilation Error").error
        );
        setOutput([]);
        setIsSuccess(false);
        setIsError(true);
      } else {
        setCompilationError("");
        setOutput(result);
        setIsSuccess(result.some((item) => item.status === "Passed"));
        setIsError(result.some((item) => item.status !== "Passed"));
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const finish = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3003/student/finishCode`,
        {
          studentId: studentId,
          jobId: jobId, // Assuming jobId is equivalent to questionId
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to mark attempt as true.");
      }

      toast({
        title: "Success",
        description: "Attempt marked as true successfully.",
        status: "success",
        duration: 6000,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to mark attempt as true",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
      setIsAuthenticated(false);
    }
  };

  return (
    <Box w="50%" h="50%" style={{ height: "50%" }}>
      {!showQuestion ? (
        <>
          <Text mb={2} fontSize="lg">
            Output
          </Text>
          <Box
            height="75vh"
            overflowY="auto"
            p={2}
            color={isError ? "red.400" : ""}
            border="1px solid"
            borderRadius={4}
            borderColor={isSuccess ? "green.500" : isError ? "red.500" : "#333"}
          >
            {compilationError ? (
              <Text>{compilationError}</Text>
            ) : output.length > 0 ? (
              <Box>
                {output.map((item, index) => (
                  <Box
                    key={index}
                    mb={4}
                    p={2}
                    borderRadius={4}
                    bgColor={item.status === "Passed" ? "green.200" : "red.200"}
                  >
                    <Text mb={2}>
                      Input: {item.input}
                      <br />
                      Expected Output: {item.expectedOutput}
                      <br />
                      Your Output: {item.yourOutput}
                      <br />
                    </Text>
                  </Box>
                ))}
              </Box>
            ) : (
              <Text>'Click "Run Code" to see the output here'</Text>
            )}
          </Box>
          <Button
            variant="outline"
            colorScheme="green"
            mb={4}
            isLoading={isLoading}
            onClick={runCode}
          >
            Run Code
          </Button>
          <Button
            variant="outline"
            colorScheme="green"
            mb={4}
            isLoading={isLoading}
            onClick={submitCode}
          >
            Submit
          </Button>
          <Button
            variant="outline"
            colorScheme="green"
            mb={4}
            isLoading={isLoading}
            onClick={finish}
          >
            Finish
          </Button>
        </>
      ) : (
        <div className="questionBox">
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Question
          </Text>
          <p>{questionText}</p>
          <Text fontSize="lg" fontWeight="bold" mt={4} mb={2}>
            Sample Test Cases
          </Text>

          <ul>
            {sampleTestCase.map((testCase, index) => (
              <ul key={index} style={{ listStyleType: "none", paddingLeft: 0 }}>
                <li style={{ marginTop: "30px" }}></li>
                <li>
                  <Text fontSize="lg" fontWeight="bold">
                    Test Case {index + 1}:
                  </Text>{" "}
                </li>

                <li>
                  <Text fontSize="lg" fontWeight="bold">
                    Input:
                  </Text>{" "}
                  {testCase.input}{" "}
                </li>
                <li>
                  <Text fontSize="lg" fontWeight="bold">
                    Output:
                  </Text>{" "}
                  {testCase.output}
                </li>
                <li>
                  <Text fontSize="lg" fontWeight="bold">
                    Explanation:
                  </Text>{" "}
                  {testCase.explanation}
                </li>
              </ul>
            ))}
          </ul>
        </div>
      )}
    </Box>
  );
};

export default Output;
