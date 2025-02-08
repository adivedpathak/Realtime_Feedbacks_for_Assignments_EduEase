import { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {  Sparkles } from "lucide-react";
interface Classroom {
  id: string;
  name: string;
  section?: string;
}
export function Navbar() {
  const [user, setUser] = useState<any>(null);
      const [accessToken, setAccessToken] = useState<string | null>(null);
      const [classrooms, setClassrooms] = useState<Classroom[]>([]);
      const [loading, setLoading] = useState<boolean>(false);
      const [error, setError] = useState<string | null>(null);
  const handleLogout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    setClassrooms([]);
    setError(null);
};
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                EduFeedback
              </span>
            </Link>

          <div className="hidden md:flex items-center space-x-6">
            {/* Links to navigate to different routes */}
            <Link
              to="/dashboard"
              className="text-purple-700 hover:text-purple-900"
            >
              Dashboard
            </Link>
            <Link
              to="/mcq-generator"
              className="text-purple-700 hover:text-purple-900"
            >
              MCQ Generator
            </Link>
            <Link to="/">
              <Button onClick={handleLogout} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                Log Out
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}


