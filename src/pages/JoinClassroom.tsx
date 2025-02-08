import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

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

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            const token = codeResponse.access_token; 
            setUser(codeResponse);
            setAccessToken(token);
            localStorage.setItem('accessToken', token);
            fetchClassrooms(token);
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

    // Logout function
    const handleLogout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('accessToken');
        setClassrooms([]);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
            <Navbar />
            <main className="container mx-auto px-4 pt-24 pb-12">
                <div className="max-w-md mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Card className="p-8">
                            <div className="text-center mb-8">
                                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-8 w-8 text-purple-600" />
                                </div>
                                <h1 className="text-2xl font-bold mb-2">Connect to Google Classroom</h1>
                                <p className="text-gray-600">Click below to authenticate and access your Google Classroom data.</p>
                            </div>

                            {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}

                            {!user ? (
                                <div className="flex justify-center">
                                    <Button onClick={() => login()} className="bg-purple-600 hover:bg-purple-700 text-white">
                                        Sign in with Google
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold text-center">Your Classrooms</h2>

                                    {loading ? (
                                        <p className="text-center text-gray-500">Loading classrooms...</p>
                                    ) : classrooms.length === 0 ? (
                                        <p className="text-center text-gray-600">No classrooms found.</p>
                                    ) : (
                                        <ul className="space-y-4">
                                            {classrooms.map((classroom) => (
                                                <li key={classroom.id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                                                    <h3 className="font-medium text-gray-900">{classroom.name}</h3>
                                                    {classroom.section && <p className="text-sm text-gray-500">Section: {classroom.section}</p>}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <div className="flex justify-center mt-4">
                                        <Button onClick={handleLogout} variant="outline" className="text-purple-600 border-purple-200 hover:bg-purple-50">
                                            Sign Out
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
