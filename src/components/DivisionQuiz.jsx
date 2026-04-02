import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Users, PawPrint, Leaf, Sparkles, Check, ArrowRight } from 'lucide-react';
import './DivisionQuiz.css';

const questions = [
  {
    id: 1,
    question: "What gets you most excited?",
    icon: Heart,
    options: [
      { text: "Helping people overcome challenges", division: 'peoples-patch' },
      { text: "Caring for animals in need", division: 'whiskers-wings' },
      { text: "Protecting nature and the environment", division: 'groves-petals' },
    ],
  },
  {
    id: 2,
    question: "Which activity sounds most fulfilling to you?",
    icon: Users,
    options: [
      { text: "Teaching kids or organizing mental health workshops", division: 'peoples-patch' },
      { text: "Feeding stray animals or visiting shelters", division: 'whiskers-wings' },
      { text: "Planting trees or cleaning up neighborhoods", division: 'groves-petals' },
    ],
  },
  {
    id: 3,
    question: "What issue do you feel needs more attention?",
    icon: PawPrint,
    options: [
      { text: "Educational inequality and poverty", division: 'peoples-patch' },
      { text: "Animal cruelty and neglect", division: 'whiskers-wings' },
      { text: "Climate change and pollution", division: 'groves-petals' },
    ],
  },
  {
    id: 4,
    question: "How do you prefer to make an impact?",
    icon: Sparkles,
    options: [
      { text: "Direct community engagement and education", division: 'peoples-patch' },
      { text: "Hands-on care for voiceless creatures", division: 'whiskers-wings' },
      { text: "Environmental restoration and advocacy", division: 'groves-petals' },
    ],
  },
  {
    id: 5,
    question: "Which cause speaks to your heart?",
    icon: Heart,
    options: [
      { text: "Creating equal opportunities for all", division: 'peoples-patch' },
      { text: "Ensuring animals live with dignity", division: 'whiskers-wings' },
      { text: "Preserving Earth for future generations", division: 'groves-petals' },
    ],
  },
];

const divisionResults = {
  'peoples-patch': {
    name: "The People's Patch",
    formalName: 'Department of Humanitarian Welfare',
    icon: Users,
    color: 'var(--c1)',
    description: "You're drawn to making a difference in people's lives. Your passion for education, mental health, and social welfare will help bridge gaps and create opportunities for those who need it most.",
  },
  'whiskers-wings': {
    name: 'Whiskers & Wings',
    formalName: 'Department of Animal Welfare',
    icon: PawPrint,
    color: 'var(--c3)',
    description: "You have a special connection with animals. Your compassion for creatures who can't speak for themselves will make a real difference in their lives through feeding drives, shelter visits, and advocacy.",
  },
  'groves-petals': {
    name: 'Groves & Petals',
    formalName: 'Department of Environmental Preservation',
    icon: Leaf,
    color: 'var(--c6)',
    description: "Nature is your calling. Your dedication to environmental preservation will help build a cleaner, more sustainable world through tree planting, clean-ups, and awareness campaigns.",
  },
};

export default function DivisionQuiz({ onClose, onSelectDivision }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnswer = (division) => {
    const newAnswers = [...answers, division];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      // Calculate result
      const counts = newAnswers.reduce((acc, div) => {
        acc[div] = (acc[div] || 0) + 1;
        return acc;
      }, {});

      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      setResult(divisionResults[winner]);
      setShowResult(true);
    }
  };

  const handleSelect = () => {
    if (result) {
      const divisionId = Object.keys(divisionResults).find(
        (key) => divisionResults[key].name === result.name
      );
      onSelectDivision(divisionId);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-overlay">
      <div className="quiz-container">
        <button className="quiz-close" onClick={onClose} aria-label="Close quiz">
          ✕
        </button>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="question"
              className="quiz-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress Bar */}
              <div className="quiz-progress">
                <div
                  className="progress-fill"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: `var(--c${(currentQuestion % 10) + 1})`,
                  }}
                />
              </div>

              <p className="quiz-counter">
                Question {currentQuestion + 1} of {questions.length}
              </p>

              {/* Question Icon */}
              <div className="quiz-icon-wrapper">
                {(() => {
                  const Icon = questions[currentQuestion].icon;
                  return <Icon size={48} color="var(--accent)" />;
                })()}
              </div>

              {/* Question */}
              <h2 className="quiz-question">{questions[currentQuestion].question}</h2>

              {/* Options */}
              <div className="quiz-options">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    className="quiz-option"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswer(option.division)}
                  >
                    <span className="option-text">{option.text}</span>
                    <ArrowRight size={20} className="option-arrow" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              className="quiz-result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, type: 'spring' }}
            >
              <div className="result-celebration">
                <Sparkles size={40} color="var(--c5)" />
              </div>

              <h2 className="result-title">Your Best Match Is...</h2>

              <div
                className="result-division"
                style={{ borderColor: result.color }}
              >
                <div
                  className="result-icon-bg"
                  style={{
                    backgroundColor: `${result.color}20`,
                    borderColor: result.color,
                  }}
                >
                  <result.icon size={56} color={result.color} />
                </div>

                <h3 className="result-name display-font">{result.name}</h3>
                <p className="result-formal mono">{result.formalName}</p>
                <p className="result-description">{result.description}</p>
              </div>

              <div className="result-actions">
                <button className="btn btn-primary" onClick={handleSelect}>
                  <Check size={18} />
                  Select This Division
                </button>
                <button className="btn btn-ghost" onClick={onClose}>
                  Explore All Divisions
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
