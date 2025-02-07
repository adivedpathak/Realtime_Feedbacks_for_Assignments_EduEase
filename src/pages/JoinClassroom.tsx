import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Users, Key } from 'lucide-react';

export default function JoinClassroom() {
  const [classCode, setClassCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle join classroom logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8">
              <div className="text-center mb-8">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Join a Classroom</h1>
                <p className="text-gray-600">
                  Enter the class code provided by your teacher
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="relative">
                    <Key className="absolute left-3 top-[8px] h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Enter class code"
                      className="pl-10 text-center text-lg tracking-wider"
                      value={classCode}
                      onChange={(e) => setClassCode(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                >
                  Join Classroom
                </Button>
              </form>

              <div className="mt-6">
                <p className="text-sm text-gray-600 text-center">
                  Don't have a class code?{' '}
                  <span className="text-purple-600">Ask your teacher</span>
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}