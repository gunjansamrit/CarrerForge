import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import Navbar from "./components/Navbar";
import { QuestionProvider } from "./components/QuestionContext"; // Import QuestionProvider from your context file

function App() {
  return (
    <QuestionProvider> {/* Wrap your components with QuestionProvider */}
      <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
        <Navbar />
        <CodeEditor />
      </Box>
    </QuestionProvider>
  );
}

export default App;
