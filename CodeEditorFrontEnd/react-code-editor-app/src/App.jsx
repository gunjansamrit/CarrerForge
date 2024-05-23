import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import Navbar from "./components/Navbar";
import { QuestionProvider } from "./components/QuestionContext"; // Import QuestionProvider from your context file
import Login from "./components/Login";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <QuestionProvider> {/* Wrap your components with QuestionProvider */}
      {isAuthenticated ? (
        <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
          <Navbar />
          <CodeEditor setIsAuthenticated={setIsAuthenticated} />
        </Box>
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </QuestionProvider>
  );
}

export default App;
