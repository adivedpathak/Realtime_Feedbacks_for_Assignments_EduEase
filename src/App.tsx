import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import LandingPage from '@/pages/LandingPage';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Dashboard from '@/pages/Dashboard';
import Classroom from '@/pages/Classroom';
import Assignment from '@/pages/Assignment';
import JoinClassroom from '@/pages/JoinClassroom';
import MCQGenerator from '@/pages/MCQGenerator';
import CreateClassroom from './pages/CreateClassroom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Feedback from './pages/Feedback';

const queryClient = new QueryClient();

function App() {
  return (
    <GoogleOAuthProvider clientId="707090231940-d10jbf8rjelqlm0c2hunbltbjm5hp2p4.apps.googleusercontent.com">
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/classroom/:id" element={<Classroom />} />
            <Route path="/assignment/:id" element={<Assignment />} />
            <Route path="/join-classroom" element={<JoinClassroom />} />
            <Route path="/mcq-generator" element={<MCQGenerator />} />
            <Route path="/create-classroom" element={<CreateClassroom />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;