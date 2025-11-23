import React, { useState, useEffect } from 'react';
import { Question, QuestionType } from '../types';
import { Heart, XCircle, CheckCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { explainWrongAnswer } from '../services/geminiService';

interface QuizGameProps {
  questions: Question[];
  onComplete: (score: number) => void;
  onExit: () => void;
}

const QuizGame: React.FC<QuizGameProps> = ({ questions, onComplete, onExit }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hearts, setHearts] = useState(5); // Local session hearts
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = questions[currentQIndex];
  const progress = ((currentQIndex) / questions.length) * 100;

  const handleSubmit = async () => {
    if (selectedOption === null) return;

    const correct = selectedOption === currentQ.correctAnswerIndex;
    setIsCorrect(correct);
    setIsSubmitted(true);

    if (correct) {
      setScore(s => s + 10);
    } else {
      setHearts(h => Math.max(0, h - 1));
      setIsLoadingFeedback(true);
      // Call AI for explanation
      const explanation = await explainWrongAnswer(
        currentQ.text,
        currentQ.options[selectedOption],
        currentQ.options[currentQ.correctAnswerIndex],
        "أساسيات الأمن السيبراني"
      );
      setAiFeedback(explanation);
      setIsLoadingFeedback(false);
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setAiFeedback(null);
    } else {
      onComplete(score);
    }
  };

  if (hearts === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in font-cairo">
        <div className="bg-rose-500/20 p-6 rounded-full mb-6">
          <Heart className="w-16 h-16 text-rose-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">تم اختراق النظام!</h2>
        <p className="text-slate-400 mb-8">لقد نفدت محاولاتك. راجع المادة العلمية وحاول مرة أخرى لتأمين الشبكة.</p>
        <button 
          onClick={onExit}
          className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-colors"
        >
          العودة للقاعدة
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col font-cairo">
      {/* Top Bar */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onExit} className="text-slate-400 hover:text-white text-2xl">&times;</button>
        <div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden" dir="ltr">
          <div 
            className="h-full bg-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex items-center gap-1 text-rose-500 font-bold">
          <Heart className="w-6 h-6 fill-current" />
          <span dir="ltr">{hearts}</span>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center leading-relaxed">
          {currentQ.text}
        </h2>

        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            let statusClass = "bg-slate-800 border-slate-700 hover:bg-slate-700";
            
            if (isSubmitted) {
              if (idx === currentQ.correctAnswerIndex) {
                statusClass = "bg-emerald-500/20 border-emerald-500 text-emerald-400";
              } else if (idx === selectedOption && !isCorrect) {
                statusClass = "bg-rose-500/20 border-rose-500 text-rose-400";
              } else {
                 statusClass = "bg-slate-800 border-slate-700 opacity-50";
              }
            } else if (selectedOption === idx) {
              statusClass = "bg-blue-500/20 border-blue-500 text-blue-300";
            }

            return (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => setSelectedOption(idx)}
                className={`w-full p-4 rounded-xl border-2 text-right font-medium text-lg transition-all ${statusClass}`}
              >
                <div className="flex justify-between items-center">
                  <span>{option}</span>
                  {isSubmitted && idx === currentQ.correctAnswerIndex && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                  {isSubmitted && idx === selectedOption && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Feedback Area */}
      <div className={`fixed bottom-0 left-0 md:left-0 right-0 md:right-20 p-4 md:p-8 border-t ${
        isSubmitted 
          ? isCorrect 
            ? 'bg-emerald-900/90 border-emerald-500' 
            : 'bg-rose-900/90 border-rose-500' 
          : 'bg-slate-900 border-slate-800'
      } backdrop-blur-lg transition-colors duration-300 z-50`}>
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {!isSubmitted ? (
             <div className="mr-auto w-full md:w-auto text-left">
               <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className={`w-full md:w-auto px-10 py-3 rounded-xl font-bold text-lg transition-all ${
                  selectedOption !== null 
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20' 
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                تحقق
              </button>
             </div>
          ) : (
            <>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {isCorrect ? (
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-rose-600" />
                    </div>
                  )}
                  <span className={`text-xl font-bold ${isCorrect ? 'text-emerald-100' : 'text-rose-100'}`}>
                    {isCorrect ? 'أحسنت!' : 'إجابة خاطئة'}
                  </span>
                </div>
                
                {!isCorrect && (
                  <div className="text-rose-100/90 text-sm">
                    <span className="font-bold block text-xs uppercase opacity-70 mb-1">الإجابة الصحيحة:</span>
                    {currentQ.options[currentQ.correctAnswerIndex]}
                    
                    {/* AI Explanation Block */}
                    <div className="mt-3 p-3 bg-black/20 rounded-lg border border-white/10">
                      <div className="flex items-center gap-2 text-white/80 text-xs font-bold mb-1">
                         <Sparkles className="w-3 h-3" /> تحليل الذكاء الاصطناعي
                      </div>
                      {isLoadingFeedback ? (
                        <span className="text-xs text-white/50 animate-pulse">جاري تحليل الثغرة...</span>
                      ) : (
                        <p className="text-sm text-white/90 leading-relaxed">{aiFeedback}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={handleNext}
                className={`w-full md:w-auto px-10 py-3 rounded-xl font-bold text-lg transition-all ${
                  isCorrect 
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-white' 
                  : 'bg-rose-500 hover:bg-rose-400 text-white'
                }`}
              >
                استمرار
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizGame;