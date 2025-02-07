import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Loader2,
  Save,
  RefreshCw,
  Download,
  Pencil,
  X,
  CheckCircle2,
  XCircle,
  Check,
} from 'lucide-react';
import axios from 'axios';
import { Navbar } from '@/components/layout/Navbar';

interface MCQ {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  total: number;
  wrongAnswers: { question: string; userAnswer: string; correctAnswer: string }[];
}

const ScoreModal = ({ isOpen, onClose, score, total, wrongAnswers }: ScoreModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
            {score === total ? (
              <CheckCircle2 className="h-8 w-8 text-purple-600" />
            ) : (
              <Brain className="h-8 w-8 text-purple-600" />
            )}
          </div>
          <h3 className="text-2xl font-bold mb-2">Your Score</h3>
          <p className="text-4xl font-bold text-purple-600">
            {score} / {total}
          </p>
          <p className="text-gray-600 mt-2">
            {Math.round((score / total) * 100)}% Correct
          </p>
        </div>

        {wrongAnswers.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Review Incorrect Answers:</h4>
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {wrongAnswers.map((wrong, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-800 mb-2">{wrong.question}</p>
                  <p className="text-red-600">Your answer: {wrong.userAnswer}</p>
                  <p className="text-green-600">Correct answer: {wrong.correctAnswer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default function MCQGenerator() {
  const [description, setDescription] = useState('');
  const [numQuestions, setNumQuestions] = useState('5');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMCQs, setGeneratedMCQs] = useState<MCQ[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<MCQ | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setShowResults(false);
    setUserAnswers({});

    try {
      const response = await axios.post('https://genmodel.onrender.com/generate', {
        prompt: description,
      });

      const mcqs = response.data.map((item: any, index: number) => ({
        question: item.Question,
        options: item.Options,
        correctAnswer: item.Options.indexOf(item.Answer),
        explanation: '',
      }));

      setGeneratedMCQs(mcqs);
    } catch (error) {
      console.error('Error generating MCQs:', error);
      alert('Something went wrong while generating the MCQs. Please try again.');
    }

    setIsGenerating(false);
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
    setIsModalOpen(true);
  };

  const calculateScore = () => {
    let correct = 0;
    generatedMCQs.forEach((_, index) => {
      if (userAnswers[index] === generatedMCQs[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleExport = () => {
    const fileName = 'generated_mcqs.json';
    const jsonContent = JSON.stringify(generatedMCQs, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  const handleRegenerate = () => {
    setGeneratedMCQs([]);
    setUserAnswers({});
    setShowResults(false);
    handleGenerate();
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditForm({ ...generatedMCQs[index] });
  };

  const handleEditChange = (field: keyof MCQ, value: string | string[], optionIndex?: number) => {
    if (!editForm) return;

    if (field === 'options' && typeof optionIndex === 'number') {
      const newOptions = [...editForm.options];
      newOptions[optionIndex] = value as string;
      setEditForm({ ...editForm, options: newOptions });
    } else {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  const saveEdit = () => {
    if (editingIndex === null || !editForm) return;

    const newMCQs = [...generatedMCQs];
    newMCQs[editingIndex] = editForm;
    setGeneratedMCQs(newMCQs);
    setEditingIndex(null);
    setEditForm(null);
  };

  const wrongAnswers = generatedMCQs
    .map((mcq, index) => {
      if (userAnswers[index] !== mcq.correctAnswer) {
        return {
          question: mcq.question,
          userAnswer: mcq.options[userAnswers[index]],
          correctAnswer: mcq.options[mcq.correctAnswer],
        };
      }
      return null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
     <Navbar/>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">AI MCQ Generator</h1>
              <p className="text-gray-600">
                Transform any text into multiple-choice questions
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="grid gap-8">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-6">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
  Content Description
</label>
<textarea
  placeholder="Enter the text content or topic description..."
  className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white hidden-scrollbar"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Questions
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    />
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!description || isGenerating}
                  className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium flex items-center justify-center disabled:opacity-50"
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Brain className="h-4 w-4 mr-2" />
                  )}
                  Generate MCQs
                </button>
              </div>
            </div>

            {/* Generated MCQs */}
            {generatedMCQs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Generated Questions</h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleRegenerate}
                        className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium flex items-center hover:bg-gray-50"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerate
                      </button>
                      <button
                        onClick={handleExport}
                        className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium flex items-center hover:bg-gray-50"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-2 mb-6">
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        activeTab === 'preview'
                          ? 'bg-purple-100 text-purple-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => setActiveTab('edit')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        activeTab === 'edit'
                          ? 'bg-purple-100 text-purple-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Edit
                    </button>
                  </div>

                  {activeTab === 'preview' ? (
                    <div className="space-y-8">
                      {generatedMCQs.map((mcq, index) => (
                        <div key={index} className="space-y-4">
                          <div className="flex items-start space-x-4">
                            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                              Q{index + 1}
                            </span>
                            <div className="flex-1">
                              <p className="font-medium mb-4">{mcq.question}</p>
                              <div className="space-y-3">
                                {mcq.options.map((option, optIndex) => (
                                  <div
                                    key={optIndex}
                                    onClick={() => handleAnswerSelect(index, optIndex)}
                                    className={`
                                      flex items-center space-x-3 p-3 rounded-lg cursor-pointer
                                      transition-colors duration-200
                                      ${
                                        userAnswers[index] === optIndex
                                          ? 'bg-purple-50 border-2 border-purple-500'
                                          : 'hover:bg-gray-50 border-2 border-transparent'
                                      }
                                    `}
                                  >
                                    <div className={`
                                      w-6 h-6 rounded-full flex items-center justify-center
                                      border-2 transition-colors duration-200
                                      ${
                                        userAnswers[index] === optIndex
                                          ? 'border-purple-500 bg-purple-500'
                                          : 'border-gray-300'
                                      }
                                    `}>
                                      {userAnswers[index] === optIndex && (
                                        <Check className="h-4 w-4 text-white" />
                                      )}
                                    </div>
                                    <span className={`
                                      ${
                                        showResults
                                          ? optIndex === mcq.correctAnswer
                                            ? 'text-green-600 font-medium'
                                            : userAnswers[index] === optIndex
                                            ? 'text-red-600'
                                            : 'text-gray-600'
                                          : userAnswers[index] === optIndex
                                          ? 'text-purple-700 font-medium'
                                          : 'text-gray-600'
                                      }
                                    `}>
                                      {option}
                                      {showResults && optIndex === mcq.correctAnswer && (
                                        <CheckCircle2 className="inline-block ml-2 h-4 w-4 text-green-600" />
                                      )}
                                      {showResults &&
                                        userAnswers[index] === optIndex &&
                                        optIndex !== mcq.correctAnswer && (
                                          <XCircle className="inline-block ml-2 h-4 w-4 text-red-600" />
                                        )}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="pt-6 border-t">
                        <button
                          onClick={handleSubmit}
                          disabled={Object.keys(userAnswers).length !== generatedMCQs.length}
                          className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium disabled:opacity-50"
                        >
                          Submit Answers
                        </button>

                        {showResults && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-purple-50 rounded-lg"
                          >
                            <p className="text-center text-lg font-medium">
                              Your Score: {calculateScore()} out of {generatedMCQs.length} ({Math.round((calculateScore() / generatedMCQs.length) * 100)}%)
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {generatedMCQs.map((mcq, index) => (
                        <div key={index} className="space-y-4 bg-gray-50 p-6 rounded-lg">
                          <div className="flex items-start justify-between">
                            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                              Q{index + 1}
                            </span>
                            <button
                              onClick={() => startEditing(index)}
                              className="text-gray-500 hover:text-purple-600"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                          </div>
                          {editingIndex === index ? (
                            <div className="space-y-4">
                              <textarea
                                value={editForm?.question}
                                onChange={(e) => handleEditChange('question', e.target.value)}
                                className="w-full p-2 border rounded-lg bg-white"
                                placeholder="Enter question"
                              />
                              {editForm?.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex space-x-2">
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) =>
                                      handleEditChange('options', e.target.value, optIndex)
                                    }
                                    className="flex-1 p-2 border rounded-lg bg-white"
                                    placeholder={`Option ${optIndex + 1}`}
                                  />
                                  <div
                                    onClick={() => handleEditChange('correctAnswer', optIndex.toString())}
                                    className={`
                                      w-6 h-6 rounded-full flex items-center justify-center cursor-pointer
                                      border-2 transition-colors duration-200 mt-2
                                      ${
                                        editForm.correctAnswer === optIndex
                                          ? 'border-purple-500 bg-purple-500'
                                          : 'border-gray-300'
                                      }
                                    `}
                                  >
                                    {editForm.correctAnswer === optIndex && (
                                      <Check className="h-4 w-4 text-white" />
                                    )}
                                  </div>
                                </div>
                              ))}
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => {
                                    setEditingIndex(null);
                                    setEditForm(null);
                                  }}
                                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={saveEdit}
                                  className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <p className="font-medium">{mcq.question}</p>
                              <div className="space-y-2">
                                {mcq.options.map((option, optIndex) => (
                                  <div key={optIndex} className="flex items-center space-x-2">
                                    <span className="w-6 h-6 flex items-center justify-center border rounded-full text-sm">
                                      {optIndex === mcq.correctAnswer ? '✓' : String.fromCharCode(65 + optIndex)}
                                    </span>
                                    <span>{option}</span>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <ScoreModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            score={calculateScore()}
            total={generatedMCQs.length}
            wrongAnswers={wrongAnswers}
          />
        )}
      </AnimatePresence>
    </div>
  );
}