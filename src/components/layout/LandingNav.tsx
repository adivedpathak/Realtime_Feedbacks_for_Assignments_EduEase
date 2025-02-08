import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

// Set up axios interceptor to attach token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Define the Classroom interface outside the function
interface Classroom {
  id: string;
  name: string;
  section?: string;
}

export default function ConnectClassroom() {
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Initialize React Router navigation

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      const token = codeResponse.access_token;
      setUser(codeResponse);
      setAccessToken(token);
      localStorage.setItem('accessToken', token);
      fetchClassrooms(token);

      // Redirect to dashboard after successful login
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Login Failed:', error);
      setError('Failed to login with Google');
    },
    scope: 'https://www.googleapis.com/auth/classroom.courses.readonly',
  });

  const fetchClassrooms = async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://classroom.googleapis.com/v1/courses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClassrooms(response.data.courses || []);
    } catch (error) {
      console.error('Error fetching classrooms:', error);
      setError('Failed to fetch classrooms.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <LandingNav login={login} />
      <div className="container mx-auto p-4">
        {error && <p className="text-red-500">{error}</p>}
        {loading ? <p>Loading classrooms...</p> : (
          <ul>
            {classrooms.map((classroom) => (
              <li key={classroom.id}>{classroom.name} {classroom.section && `(${classroom.section})`}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function LandingNav({ login }: { login: () => void }) {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              EduFeedback
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button
              onClick={login}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90"
            >
              Join Classroom
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
