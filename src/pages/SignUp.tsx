import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'; // Ensure RadioGroup and RadioGroupItem are correct
import { GraduationCap, User, Mail, Lock, ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student', // Default role is 'student'
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data on Submit:', formData); // Debugging form data before submission
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/`, {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      console.log(response);
      toast({
        title: 'Account Created Successfully!',
      });
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'student', 
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error Signing Up. Please try again!',
      });
    }
  };

  const handleRoleChange = (value: string) => {
    console.log('Selected Role:', value); // Debugging: Log selected role
    setFormData({ ...formData, role: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 flex items-center justify-center px-4 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        <Link to="/" className="absolute top-8 left-4 text-purple-600 hover:text-purple-600 transition duration-300">
          <ChevronLeft className="h-8 w-8" />
        </Link>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                EduFeedback
              </span>
            </Link>
            <h1 className="text-2xl font-bold mt-6 mb-2">Create your account</h1>
            <p className="text-gray-600">Start your learning journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-[8px] h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  className="pl-10"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-[8px] h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-[8px] h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>I am a</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={handleRoleChange} // Update role on change
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="STUDENT" id="student" />
                  <Label htmlFor="student">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TEACHER" id="teacher" />
                  <Label htmlFor="teacher">Teacher</Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Already have an account?</span>{' '}
            <Link
              to="/signin"
              className="font-semibold text-purple-600 hover:text-purple-500"
            >
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
