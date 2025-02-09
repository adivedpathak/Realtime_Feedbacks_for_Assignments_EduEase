import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/card';
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  Calendar, 
  Award,
  AlertCircle,
  Link as LinkIcon,
  MessageCircle,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import axios from 'axios';

interface DriveFile {
  id: string;
  title: string;
  alternateLink: string;
  thumbnailUrl?: string;
}

interface Material {
  driveFile?: {
    driveFile: DriveFile;
    shareMode: string;
  };
}

interface Submission {
  id: string;
  state: string;
  alternateLink: string;
  creationTime: string;
  updateTime: string;
  assignmentSubmission?: {
    attachments?: Array<{
      driveFile?: DriveFile;
    }>;
  };
}

interface Assignment {
  courseId: string;
  id: string;
  title: string;
  description?: string;
  state: 'PUBLISHED' | 'DRAFT';
  alternateLink: string;
  creationTime: string;
  updateTime: string;
  maxPoints: number;
  workType: string;
  materials?: Material[];
  submissions: Submission[];
}

export default function Classroom() {
  const { id } = useParams();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigator = useNavigate();
  useEffect(() => {
    const fetchAssignments = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('No access token found. Please login.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(
          `https://classroom.googleapis.com/v1/courses/${id}/courseWork`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const assignmentsData = response.data.courseWork || [];

        const enrichedAssignments = await Promise.all(
          assignmentsData.map(async (assignment: Assignment) => {
            const submissionResponse = await axios.get(
              `https://classroom.googleapis.com/v1/courses/${id}/courseWork/${assignment.id}/studentSubmissions`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            const submissions = submissionResponse.data.studentSubmissions || [];
            return { ...assignment, submissions };
          })
        );

        setAssignments(enrichedAssignments);
      } catch (err) {
        setError('Failed to load assignments data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAssignments();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const EmptyState = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-[calc(100vh-300px)]"
    >
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full mb-6">
        <BookOpen className="h-12 w-12 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">No Assignments Yet</h2>
      <p className="text-gray-600 text-center max-w-md mb-6">
        There are currently no assignments in this classroom. Check back later for new assignments.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:opacity-90 transition-opacity"
      >
        <span>Refresh</span>
      </button>
    </motion.div>
  );
  const handleFeedback = (assignment: Assignment) => {
    console.log('Get feedback for assignment:', assignment);
    navigator('/feedback');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {!loading && !error && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2 text-gray-800">Classroom Assignments</h1>
            <p className="text-gray-600">Manage and track your classroom assignments</p>
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xl text-gray-600">Loading...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-500 bg-opacity-20 border border-red-300 rounded-lg p-4 text-red-700">
            <AlertCircle className="inline-block mr-2" />
            {error}
          </div>
        ) : assignments.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {assignments.map((assignment) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-xl text-gray-800">{assignment.title}</h3>
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full">
                      <Award className="h-5 w-5" />
                      <span>{assignment.maxPoints} pts</span>
                    </div>
                  </div>

                  {assignment.description && (
                    <p className="text-gray-600 mb-4">{assignment.description}</p>
                  )}

                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(assignment.creationTime)}
                    </div>
                    <button
                      onClick={() => window.open(assignment.alternateLink, '_blank')}
                      className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 transition-colors bg-purple-50 px-3 py-1 rounded-full"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Open Assignment</span>
                    </button>
                  </div>

                  {assignment.materials && assignment.materials.length > 0 && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-700 mb-3">Materials:</h4>
                      {assignment.materials.map((material, index) => (
                        material.driveFile && (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm mb-2 last:mb-0 hover:bg-gray-50 transition-colors group">
                            {material.driveFile.driveFile.thumbnailUrl && (
                              <img
                                src={material.driveFile.driveFile.thumbnailUrl}
                                alt={material.driveFile.driveFile.title}
                                className="h-12 w-12 rounded-md object-cover"
                              />
                            )}
                            <a
                              href={material.driveFile.driveFile.alternateLink}
                              className="text-gray-700 group-hover:text-purple-600 transition-colors text-sm flex items-center flex-1"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span className="line-clamp-1">{material.driveFile.driveFile.title}</span>
                            </a>
                          </div>
                        )
                      ))}
                    </div>
                  )}

                  {assignment.submissions?.length > 0 && (
                    <div className="space-y-3 flex-1">
                      <h4 className="font-semibold text-gray-700">Submissions:</h4>
                      {assignment.submissions.map((submission) => (
                        <div 
                          key={submission.id}
                          className="p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              {submission.state === 'TURNED_IN' ? (
                                <CheckCircle2 className="text-green-500 mr-2 h-5 w-5" />
                              ) : (
                                <Clock className="text-yellow-500 mr-2 h-5 w-5" />
                              )}
                              <span className="text-sm font-medium text-gray-700">{submission.state}</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {formatDate(submission.updateTime)}
                            </span>
                          </div>

                          {submission.assignmentSubmission?.attachments?.map((attachment, index) => (
                            attachment.driveFile && (
                              <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors group">
                                {attachment.driveFile.thumbnailUrl && (
                                  <img
                                    src={attachment.driveFile.thumbnailUrl}
                                    alt={attachment.driveFile.title}
                                    className="h-12 w-12 rounded-md object-cover"
                                  />
                                )}
                                <a
                                  href={attachment.driveFile.alternateLink}
                                  className="text-gray-700 group-hover:text-purple-600 transition-colors text-sm flex items-center flex-1"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span className="line-clamp-1">{attachment.driveFile.title}</span>
                                </a>
                              </div>
                            )
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  <button 
                    className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
                    onClick={() => handleFeedback(assignment)}
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Get Feedback</span>
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}