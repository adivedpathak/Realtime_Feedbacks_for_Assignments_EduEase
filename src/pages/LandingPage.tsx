import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Users, 
  LineChart, 
  MessageSquare,
  ArrowRight,
  CheckCircle,
  FileText,
  Zap,
} from 'lucide-react';
import LandingNav from '@/components/layout/LandingNav';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Feedback',
    description: 'Get instant, personalized feedback on your assignments powered by advanced AI.'
  },
  {
    icon: Users,
    title: 'Collaborative Learning',
    description: 'Connect with classmates and teachers in an interactive learning environment.'
  },
  {
    icon: LineChart,
    title: 'Progress Tracking',
    description: 'Monitor your academic growth with detailed analytics and insights.'
  },
  {
    icon: MessageSquare,
    title: 'Real-time Communication',
    description: 'Engage in discussions and receive immediate responses from educators.'
  }
];

const steps = [
  {
    icon: FileText,
    title: 'Submit Your Work',
    description: 'Upload your assignments or papers through our intuitive interface.'
  },
  {
    icon: Zap,
    title: 'Instant Analysis',
    description: 'Our AI analyzes your work and generates comprehensive feedback.'
  },
  {
    icon: CheckCircle,
    title: 'Receive Feedback',
    description: 'Get detailed suggestions and improvements to enhance your work.'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Student, Computer Science',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    quote: 'EduFeedback has transformed how I learn. The instant AI feedback helps me improve my work before submission.'
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Professor, Engineering',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    quote: 'This platform has revolutionized how I provide feedback to my students. Its efficient and highly effective.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Teaching Assistant',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    quote: 'The collaborative features make it easy to support students and track their progress effectively.'
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
       <LandingNav/>
      {/* Hero Section */}  
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-16 px-4"
      >
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Smarter Feedback for
            <br />
            Smarter Learning
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your academic journey with AI-powered feedback and personalized learning experiences.
          </p>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg px-8 py-6 rounded-full">
              Get Started Free
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features for Enhanced Learning
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-6">
                    <step.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-purple-100" />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Learning Experience?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of students and educators who are already benefiting from AI-powered feedback.
            </p>
            <Link to="/signup">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-full">
                Start Your Free Trial
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">EduFeedback</h3>
              <p className="text-gray-600">Transforming education through AI-powered feedback.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Features</li>
                <li>Pricing</li>
                <li>Use Cases</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-600">
            <p>&copy; 2025 EduFeedback. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}