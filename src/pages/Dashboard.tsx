import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Book,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  Users,
  FileText,
} from 'lucide-react';

const courses = [
  {
    id: 1,
    name: 'Advanced Mathematics',
    progress: 75,
    nextAssignment: 'Calculus Quiz',
    dueDate: '2025-03-20',
  },
  {
    id: 2,
    name: 'World Literature',
    progress: 60,
    nextAssignment: 'Essay Analysis',
    dueDate: '2025-03-22',
  },
  {
    id: 3,
    name: 'Physics 101',
    progress: 85,
    nextAssignment: 'Lab Report',
    dueDate: '2025-03-21',
  },
];

const stats = [
  {
    icon: Award,
    label: 'Average Grade',
    value: '92%',
    color: 'text-yellow-500',
  },
  {
    icon: TrendingUp,
    label: 'Completion Rate',
    value: '88%',
    color: 'text-green-500',
  },
  {
    icon: Clock,
    label: 'Study Hours',
    value: '24h',
    color: 'text-blue-500',
  },
  {
    icon: FileText,
    label: 'Assignments',
    value: '12',
    color: 'text-purple-500',
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
          <p className="text-gray-600">
            Track your progress and manage your assignments
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-full bg-opacity-10 ${
                      stat.color.replace('text', 'bg')
                    }`}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Courses Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Book className="h-6 w-6 text-purple-600" />
                    <h3 className="font-semibold">{course.name}</h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    {course.progress}%
                  </span>
                </div>

                <Progress value={course.progress} className="mb-4" />

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Next: {course.nextAssignment}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Due: {course.dueDate}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Assignment Submitted</p>
                  <p className="text-sm text-gray-600">
                    Mathematics Homework - Chapter 5
                  </p>
                </div>
                <span className="ml-auto text-sm text-gray-500">2h ago</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Joined Study Group</p>
                  <p className="text-sm text-gray-600">
                    Advanced Physics Discussion
                  </p>
                </div>
                <span className="ml-auto text-sm text-gray-500">5h ago</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}