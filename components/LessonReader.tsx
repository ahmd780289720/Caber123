import React, { useState } from 'react';
import { Lesson, UnderstandingLevel } from '../types';
import { CheckCircle, HelpCircle, AlertCircle, ArrowLeft, Bot, Book } from 'lucide-react';
import { simplifyLesson } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface LessonReaderProps {
  lesson: Lesson;
  onComplete: (understanding: UnderstandingLevel) => void;
}

const LessonReader: React.FC<LessonReaderProps> = ({ lesson, onComplete }) => {
  const [understanding, setUnderstanding] = useState<UnderstandingLevel>(UnderstandingLevel.NOT_SET);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const handleUnderstanding = async (level: UnderstandingLevel) => {
    setUnderstanding(level);
    
    if (level === UnderstandingLevel.NOT_UNDERSTOOD) {
      setIsLoadingAi(true);
      const summary = await simplifyLesson(lesson.content);
      setAiSummary(summary);
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden font-cairo">
      {/* Header */}
      <div className="bg-slate-900 p-6 border-b border-slate-700">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{lesson.title}</h2>
            <div className="flex gap-2 text-xs text-slate-400">
              <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded">مبتدئ</span>
              <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs" dir="ltr">+ {lesson.xpReward} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 text-slate-300 leading-relaxed space-y-6 text-right">
        {/* Simple Markdown Rendering Simulation */}
        <div className="prose prose-invert max-w-none prose-headings:font-cairo">
           {lesson.content.split('\n').map((line, i) => {
             if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-white my-4">{line.replace('# ', '')}</h1>;
             if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-white my-3">{line.replace('## ', '')}</h2>;
             if (line.startsWith('* ')) return <li key={i} className="mr-4 list-disc">{line.replace('* ', '')}</li>;
             if (line.startsWith('1. ')) return <li key={i} className="mr-4 list-decimal">{line.replace('1. ', '')}</li>;
             return <p key={i} className="min-h-[1rem]">{line}</p>;
           })}
        </div>
        
        {/* Book Reference */}
        {lesson.bookReference && (
            <div className="mt-8 p-4 bg-slate-900/80 border border-slate-700 rounded-xl flex items-center gap-4">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                    <Book className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <p className="text-xs text-slate-500 font-bold">المرجع الموصى به:</p>
                    <p className="text-sm text-slate-200">{lesson.bookReference}</p>
                </div>
            </div>
        )}
      </div>

      {/* AI Summary Section (Triggered if not understood) */}
      {(isLoadingAi || aiSummary) && (
        <div className="mx-6 mb-6 p-4 bg-violet-500/10 border border-violet-500/30 rounded-xl animate-fade-in">
          <div className="flex items-center gap-2 mb-2 text-violet-400">
            <Bot className="w-5 h-5" />
            <span className="font-bold text-sm">شرح مبسط من المعلم الذكي</span>
          </div>
          {isLoadingAi ? (
            <div className="flex space-x-2 items-center h-12 justify-center">
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce delay-150"></div>
            </div>
          ) : (
            <p className="text-slate-200 text-sm italic leading-relaxed">{aiSummary}</p>
          )}
        </div>
      )}

      {/* Footer / Actions */}
      <div className="p-6 bg-slate-900/50 border-t border-slate-700">
        <h3 className="text-center text-slate-400 text-sm mb-4 uppercase tracking-wider font-bold">
          ما مدى استيعابك للدرس؟
        </h3>
        
        {understanding === UnderstandingLevel.NOT_SET ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => handleUnderstanding(UnderstandingLevel.UNDERSTOOD)}
              className="p-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex flex-col items-center gap-2 transition-all group"
            >
              <CheckCircle className="w-8 h-8 text-emerald-500 group-hover:scale-110 transition-transform" />
              <span className="text-emerald-400 font-bold">فهمت بالكامل</span>
            </button>
            
            <button 
              onClick={() => handleUnderstanding(UnderstandingLevel.PARTIAL)}
              className="p-4 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex flex-col items-center gap-2 transition-all group"
            >
              <HelpCircle className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition-transform" />
              <span className="text-yellow-400 font-bold">فهمت جزئياً</span>
            </button>
            
            <button 
              onClick={() => handleUnderstanding(UnderstandingLevel.NOT_UNDERSTOOD)}
              className="p-4 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl flex flex-col items-center gap-2 transition-all group"
            >
              <AlertCircle className="w-8 h-8 text-rose-500 group-hover:scale-110 transition-transform" />
              <span className="text-rose-400 font-bold">لم أفهم</span>
            </button>
          </div>
        ) : (
          <div className="flex justify-center animate-fade-in">
             <button 
               onClick={() => onComplete(understanding)}
               className="flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-lg shadow-lg shadow-emerald-600/20 transition-all hover:translate-y-[-2px]"
             >
               ابدأ التحدي <ArrowLeft className="w-5 h-5" />
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonReader;