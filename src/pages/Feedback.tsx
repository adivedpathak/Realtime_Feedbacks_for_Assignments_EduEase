import React from "react";
import {
  BarChart3,
  Target,
  TrendingUp,
  ScrollText,
  CheckCircle2,
  Brain,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

interface FeedbackData {
  relevance: string;
  evaluation_score: string;
  overall_feedback: string;
  readability_score: number;
  cosine_score: number;
  jaccard_index: number;
}

const feedback: FeedbackData = {
  relevance: "High relevance to the topic",
  evaluation_score: "7",
  overall_feedback:
    "Overall Strengths:\n• Scalability & Efficiency\n• Consistency & Objectivity\n• Personalized Feedback\n\nChallenges:\n• Contextual Understanding\n• Bias & Fairness\n• Ethical Considerations",
  readability_score: 63.36,
  cosine_score: 0.3734,
  jaccard_index: 0.0,
};

interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  percentage: number;
  description: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, label, value, color, percentage, description }) => {
  return (
    <div className="bg-white rounded-xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
        <div className={`p-2 ${color} rounded-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

const Feedback: React.FC = () => {
  const metrics = [
    {
      icon: BarChart3,
      label: "Readability Score",
      value: `${feedback.readability_score.toFixed(1)}%`,
      color: "bg-indigo-600",
      percentage: feedback.readability_score,
      description: "Measures clarity and ease of understanding.",
    },
    {
      icon: Target,
      label: "Relevance Score",
      value: "High",
      color: "bg-purple-600",
      percentage: 90,
      description: "How well the content aligns with the topic.",
    },
    {
      icon: TrendingUp,
      label: "Similarity Index",
      value: `${(feedback.cosine_score * 100).toFixed(1)}%`,
      color: "bg-blue-600",
      percentage: feedback.cosine_score * 100,
      description: "Content similarity assessment.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto relative">
         
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-10">Assignment Feedback Analysis</h1>
          <p className="text-gray-600 mb-8">Comprehensive evaluation metrics and insights</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
            <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ScrollText className="w-5 h-5 mr-2 text-indigo-600" /> Detailed Feedback
              </h2>
              <div className="text-gray-700 space-y-4">
                {feedback.overall_feedback.split("\n\n").map((section, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap font-sans">{section}</pre>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-indigo-600" /> Key Takeaways
                </h2>
                <ul className="text-gray-700 space-y-2">
                  <li>✅ Strong content relevance and topic alignment</li>
                  <li>✅ Good readability score indicating clear communication</li>
                  <li>✅ Balanced evaluation with constructive feedback</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-indigo-600" /> Improvement Areas
                </h2>
                <ul className="text-gray-700 space-y-2">
                  <li>📌 Improve content structuring for better flow.</li>
                  <li>📌 Enhance technical depth where necessary.</li>
                  <li>📌 Ensure thorough analysis with supporting details.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feedback;