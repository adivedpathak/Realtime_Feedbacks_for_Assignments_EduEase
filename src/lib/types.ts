export interface MCQ {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }
  
export interface Analysis {
    question: string;
    analysis: string;
    youtube_video_url: string;
}
  
export interface ScoreModalProps {
    isOpen: boolean;
    onClose: () => void;
    score: number;
    total: number;
    wrongAnswers: { question: string; userAnswer: string; correctAnswer: string }[];
    onFeedback: () => void;
    analysis: Analysis[];
    showAnalysis: boolean;
  }