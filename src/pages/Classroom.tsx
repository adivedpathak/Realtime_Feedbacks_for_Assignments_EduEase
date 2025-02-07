import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Users,
  FileText,
  MessageSquare,
  Calendar,
  PlusCircle,
  Clock,
  CheckCircle2,
} from 'lucide-react';

const assignments = [
  {
    id: 1,
    title: 'Linear Algebra Quiz',
    dueDate: '2025-03-20',
    status: 'completed',
    score: '95/100',
  },
  {
    id: 2,
    title: 'Vector Calculus Assignment',
    dueDate: '2025-03-25',
    status: 'in-progress',
  },
  {
    id: 3,
    title: 'Differential Equations Project',
    dueDate: '2025-04-01',
    status: 'upcoming',
  },
];

const students = [
  {
    id: 1,
    name: 'Emma Thompson',
    email: 'emma.t@example.com',
    progress: 85,
  },
  {
    id: 2,
    name: 'James Wilson',
    email: 'james.w@example.com',
    progress: 92,
  },
  {
    id: 3,
    name: 'Sophie Chen',
    email: 'sophie.c@example.com',
    progress: 78,
  },
];

const discussions = [
  {
    id: 1,
    title: 'Question about Vector Spaces',
    author: 'Emma Thompson',
    replies: 5,
    lastActivity: '2h ago',
  },
  {
    id: 2,
    title: 'Help with Eigenvalues',
    author: 'James Wilson',
    replies: 3,
    lastActivity: '5h ago',
  },
];

export default function Classroom() {
  const [activeTab, setActiveTab] = useState('assignments');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Classroom Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Advanced Mathematics</h1>
              <p className="text-gray-600">
                Professor: Dr. Sarah Johnson • Room 301
              </p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Assignment
            </Button>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="assignments" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Assignments
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Students
            </TabsTrigger>
            <TabsTrigger value="discussions" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Discussions
            </TabsTrigger>
          </TabsList>

          {/* Assignments Tab */}
          <TabsContent value="assignments">
            <div className="grid gap-6">
              {assignments.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-full ${
                            assignment.status === 'completed'
                              ? 'bg-green-100'
                              : assignment.status === 'in-progress'
                              ? 'bg-yellow-100'
                              : 'bg-gray-100'
                          }`}
                        >
                          {assignment.status === 'completed' ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <Clock className="h-5 w-5 text-yellow-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{assignment.title}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Calendar className="h-4 w-4 mr-2" />
                            Due: {assignment.dueDate}
                          </div>
                        </div>
                      </div>
                      {assignment.score && (
                        <span className="text-green-600 font-semibold">
                          {assignment.score}
                        </span>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <div className="grid gap-6">
              {students.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-gray-600">{student.email}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-600">Progress</span>
                        <p className="font-semibold text-purple-600">
                          {student.progress}%
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Discussions Tab */}
          <TabsContent value="discussions">
            <div className="grid gap-6">
              {discussions.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{discussion.title}</h3>
                        <p className="text-sm text-gray-600">
                          Started by {discussion.author}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-600">
                          {discussion.replies} replies
                        </span>
                        <p className="text-sm text-gray-500">
                          Last activity: {discussion.lastActivity}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}