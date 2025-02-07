import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
  Calendar,
  Clock,
  Upload,
  MessageSquare,
  CheckCircle2,
  BarChart,
} from 'lucide-react';

export default function Assignment() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="w-full max-w-6xl px-4 pt-24 pb-12">
        <Navbar />

        <main>
          {/* Assignment Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Vector Calculus Quiz</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Due: March 25, 2025
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Time: 60 minutes
                  </div>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                Submit Assignment
              </Button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-600 mb-4">
                      Complete the following problems related to vector calculus.
                      Show all your work and explain your reasoning for each step.
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                      <li>Calculate the gradient of the scalar field f(x,y,z)</li>
                      <li>Find the divergence of the vector field F(x,y,z)</li>
                      <li>Evaluate the line integral along the given curve</li>
                    </ol>
                  </div>
                </Card>
              </motion.div>

              {/* File Upload */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Your Solution</h2>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">
                      Drag and drop your solution file here
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Supported formats: PDF, DOC, DOCX
                    </p>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Comments */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Comments</h2>
                  <div className="space-y-4 mb-4">
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 font-semibold">SJ</span>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold">Dr. Sarah Johnson</p>
                        <p className="text-gray-600 text-sm mb-2">2 hours ago</p>
                        <p className="text-gray-700">
                          Remember to show all steps clearly in your solution.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Add a comment..."
                      className="w-full"
                    />
                    <Button variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Add Comment
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Your Progress</h3>
                  <Progress value={60} className="mb-2" />
                  <p className="text-sm text-gray-600">2 of 3 problems completed</p>
                </Card>
              </motion.div>

              {/* Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Assignment Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-green-600">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      <span>Problem 1 completed</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      <span>Problem 2 completed</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>Problem 3 pending</span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Performance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Class Performance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Class Average</span>
                      <span className="font-semibold">85%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Your Score</span>
                      <span className="font-semibold text-purple-600">92%</span>
                    </div>
                    <div className="pt-4">
                      <Button variant="outline" className="w-full">
                        <BarChart className="h-4 w-4 mr-2" />
                        View Detailed Analytics
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
